
import os
import json
import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from PIL import Image, ImageTk, ImageOps
import threading
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

class ImageToolsApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Tools")
        self.root.geometry("1000x700")
        
        # Categories data
        self.categories = {
            'street': 'Street',
            'nature': 'Nature',
            'conceptual': 'Conceptual',
            'monochrome': 'Monochrome'
        }
        
        # Default camera info
        self.default_camera = "Canon EOS 1100D"
        self.default_lens = "18-55mm f/3.5-5.6"
        
        self.create_main_menu()
    
    def create_main_menu(self):
        """Create main menu with new JSON sorter option"""
        self.clear_window()
        
        title_label = ttk.Label(self.root, text="Image Tools", font=("Helvetica", 16))
        title_label.pack(pady=20)
        
        convert_btn = ttk.Button(
            self.root, 
            text="Batch Convert Images", 
            command=self.create_converter_ui
        )
        convert_btn.pack(pady=10, ipadx=20, ipady=10)
        
        json_btn = ttk.Button(
            self.root, 
            text="Edit Image Metadata", 
            command=self.create_metadata_editor
        )
        json_btn.pack(pady=10, ipadx=20, ipady=10)
        
        # New JSON sorter button
        sorter_btn = ttk.Button(
            self.root,
            text="Sort JSON Files by Date",
            command=self.create_json_sorter_ui
        )
        sorter_btn.pack(pady=10, ipadx=20, ipady=10)
    
    
    def create_json_sorter_ui(self):
        """Create UI for JSON sorter tool"""
        self.clear_window()
        
        # Back button
        back_btn = ttk.Button(self.root, text="← Back", command=self.create_main_menu)
        back_btn.pack(anchor="nw", padx=10, pady=10)
        
        title_label = ttk.Label(self.root, text="JSON File Sorter", font=("Helvetica", 14))
        title_label.pack(pady=10)
        
        # Directory selection
        ttk.Label(self.root, text="Directory with JSON files:").pack(pady=(10, 0))
        self.json_dir_var = tk.StringVar()
        dir_frame = ttk.Frame(self.root)
        dir_frame.pack()
        ttk.Entry(dir_frame, textvariable=self.json_dir_var, width=50).pack(side="left")
        ttk.Button(dir_frame, text="Browse", command=self.browse_json_dir).pack(side="left", padx=5)
        
        # Sort options
        options_frame = ttk.Frame(self.root)
        options_frame.pack(pady=10)
        
        ttk.Label(options_frame, text="Sort order:").grid(row=0, column=0, sticky="w")
        self.sort_order = tk.StringVar(value="newest")
        ttk.Radiobutton(options_frame, text="Newest first", variable=self.sort_order, value="newest").grid(row=0, column=1, sticky="w")
        ttk.Radiobutton(options_frame, text="Oldest first", variable=self.sort_order, value="oldest").grid(row=0, column=2, sticky="w")
        
        ttk.Label(options_frame, text="Action:").grid(row=1, column=0, sticky="w")
        self.sort_action = tk.StringVar(value="preview")
        ttk.Radiobutton(options_frame, text="Preview only", variable=self.sort_action, value="preview").grid(row=1, column=1, sticky="w")
        ttk.Radiobutton(options_frame, text="Save sorted files", variable=self.sort_action, value="save").grid(row=1, column=2, sticky="w")
        
        # Results frame
        results_frame = ttk.LabelFrame(self.root, text="Sorted Results", padding=10)
        results_frame.pack(fill="both", expand=True, padx=10, pady=10)
        
        # Treeview for results
        self.results_tree = ttk.Treeview(results_frame, columns=("date", "path", "items"), show="headings")
        self.results_tree.heading("#1", text="Date")
        self.results_tree.heading("#2", text="File Path")
        self.results_tree.heading("#3", text="Items")
        self.results_tree.column("#1", width=120)
        self.results_tree.column("#2", width=350)
        self.results_tree.column("#3", width=80)
        self.results_tree.pack(fill="both", expand=True)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(results_frame, orient="vertical", command=self.results_tree.yview)
        scrollbar.pack(side="right", fill="y")
        self.results_tree.configure(yscrollcommand=scrollbar.set)
        
        # Sort button
        ttk.Button(
            self.root,
            text="Process JSON Files",
            command=self.process_json_files
        ).pack(pady=10, ipadx=20, ipady=5)

    def process_json_files(self):
        """Sort JSON files by tdate and optionally save them"""
        directory = self.json_dir_var.get()
        if not directory or not os.path.isdir(directory):
            messagebox.showerror("Error", "Please select a valid directory")
            return
        
        # Clear previous results
        for item in self.results_tree.get_children():
            self.results_tree.delete(item)
        
        files_data = []
        all_items = []
        
        # First pass: collect all items from all files
        for filename in os.listdir(directory):
            if filename.endswith('.json'):
                filepath = os.path.join(directory, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        
                        if isinstance(data, list):
                            for item in data:
                                if 'tdate' in item:
                                    try:
                                        tdate = datetime.strptime(item['tdate'], '%Y-%m-%d')
                                        all_items.append((tdate, item, filename))
                                    except ValueError:
                                        continue
                        elif isinstance(data, dict) and 'tdate' in data:
                            try:
                                tdate = datetime.strptime(data['tdate'], '%Y-%m-%d')
                                all_items.append((tdate, data, filename))
                            except ValueError:
                                continue
                                
                except (json.JSONDecodeError, UnicodeDecodeError) as e:
                    self.results_tree.insert("", "end", values=("ERROR", f"{filename}: {str(e)}", ""))
                    continue
        
        # Sort all items by date
        reverse_sort = self.sort_order.get() == "newest"
        all_items.sort(key=lambda x: x[0], reverse=reverse_sort)
        
        # Group items by original filename for display
        file_groups = {}
        for tdate, item, filename in all_items:
            if filename not in file_groups:
                file_groups[filename] = []
            file_groups[filename].append((tdate, item))
        
        # Display results
        for filename, items in file_groups.items():
            filepath = os.path.join(directory, filename)
            date_range = f"{items[0][0].strftime('%Y-%m-%d')} to {items[-1][0].strftime('%Y-%m-%d')}"
            self.results_tree.insert("", "end", values=(date_range, filepath, len(items)))
        
        # Save sorted files if requested
        if self.sort_action.get() == "save":
            self.save_sorted_files(directory, all_items)
            messagebox.showinfo("Complete", f"Sorted and saved {len(all_items)} items from {len(file_groups)} files")
        else:
            messagebox.showinfo("Complete", f"Found {len(all_items)} items in {len(file_groups)} files (preview only)")

    def save_sorted_files(self, directory, sorted_items):
        """Save sorted items back to files"""
        # Create output directory if it doesn't exist
        output_dir = os.path.join(directory, "sorted")
        os.makedirs(output_dir, exist_ok=True)
        
        # Group items by original filename
        file_groups = {}
        for tdate, item, filename in sorted_items:
            if filename not in file_groups:
                file_groups[filename] = []
            file_groups[filename].append(item)
        
        # Save each file with sorted items
        for filename, items in file_groups.items():
            output_path = os.path.join(output_dir, filename)
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(items, f, ensure_ascii=False, indent=2)
        
        # Create a combined file with all items
        combined_path = os.path.join(output_dir, "combined_sorted.json")
        with open(combined_path, 'w', encoding='utf-8') as f:
            json.dump([item for _, item, _ in sorted_items], f, ensure_ascii=False, indent=2)
    
    def browse_json_dir(self):
        """Browse for JSON directory"""
        directory = filedialog.askdirectory()
        if directory:
            self.json_dir_var.set(directory)
    
    def create_converter_ui(self):
        """Create the image converter UI"""
        self.clear_window()
        
        # Back button
        back_btn = ttk.Button(self.root, text="← Back", command=self.create_main_menu)
        back_btn.pack(anchor="nw", padx=10, pady=10)
        
        title_label = ttk.Label(self.root, text="Image Converter", font=("Helvetica", 14))
        title_label.pack(pady=10)
        
        # Input folder
        ttk.Label(self.root, text="Input Folder:").pack(pady=(10, 0))
        self.input_folder = tk.StringVar(value=os.path.abspath("./images/todo"))
        input_frame = ttk.Frame(self.root)
        input_frame.pack()
        ttk.Entry(input_frame, textvariable=self.input_folder, width=50).pack(side="left")
        ttk.Button(input_frame, text="Browse", command=self.browse_input_folder).pack(side="left", padx=5)
        
        # Output folder
        ttk.Label(self.root, text="Output Folder:").pack(pady=(10, 0))
        self.output_folder = tk.StringVar(value=os.path.abspath("./images/processed"))
        output_frame = ttk.Frame(self.root)
        output_frame.pack()
        ttk.Entry(output_frame, textvariable=self.output_folder, width=50).pack(side="left")
        ttk.Button(output_frame, text="Browse", command=self.browse_output_folder).pack(side="left", padx=5)
        
        # WEBP settings
        ttk.Label(self.root, text="WEBP Settings", font=("Helvetica", 12)).pack(pady=(20, 5))
        
        ttk.Label(self.root, text="Quality (1-100):").pack()
        self.webp_quality = tk.IntVar(value=85)
        ttk.Scale(self.root, from_=1, to=100, variable=self.webp_quality, orient="horizontal").pack()
        
        # Log window
        ttk.Label(self.root, text="Conversion Log", font=("Helvetica", 12)).pack(pady=(20, 5))
        self.log_text = tk.Text(self.root, height=10, state="disabled")
        self.log_text.pack(fill="both", expand=True, padx=10, pady=(0, 10))
        
        # Convert button
        ttk.Button(
            self.root, 
            text="Convert Images", 
            command=self.start_conversion_thread
        ).pack(pady=10, ipadx=20, ipady=5)
    
    def create_metadata_editor(self):
        """Create metadata editor interface"""
        self.clear_window()
        
        # Back button
        back_btn = ttk.Button(self.root, text="← Back", command=self.create_main_menu)
        back_btn.grid(row=0, column=0, padx=10, pady=10, sticky="nw")
        
        # Main frames
        self.image_frame = ttk.LabelFrame(self.root, text="Image Preview", padding=10)
        self.image_frame.grid(row=1, column=0, padx=10, pady=10, sticky="nsew")
        
        self.form_frame = ttk.LabelFrame(self.root, text="Metadata", padding=10)
        self.form_frame.grid(row=1, column=1, padx=10, pady=10, sticky="nsew")
        
        # Image preview
        self.image_label = ttk.Label(self.image_frame)
        self.image_label.pack()
        
        # Metadata form
        ttk.Label(self.form_frame, text="File ID:").grid(row=0, column=0, sticky="w")
        self.file_id_label = ttk.Label(self.form_frame, text="")
        self.file_id_label.grid(row=0, column=1, sticky="w")
        
        ttk.Label(self.form_frame, text="Title:").grid(row=1, column=0, sticky="w")
        self.title_entry = ttk.Entry(self.form_frame, width=40)
        self.title_entry.grid(row=1, column=1, pady=5, sticky="w")

        ttk.Label(self.form_frame, text="Description:").grid(row=2, column=0, sticky="nw")
        self.description_text = tk.Text(self.form_frame, width=40, height=5)
        self.description_text.grid(row=2, column=1, pady=5, sticky="w")
        
        ttk.Label(self.form_frame, text="Season:").grid(row=3, column=0, sticky="w")
        self.season_entry = ttk.Entry(self.form_frame, width=40)
        self.season_entry.grid(row=3, column=1, pady=5, sticky="w")
        
        ttk.Label(self.form_frame, text="Categories:").grid(row=4, column=0, sticky="nw")
        ttk.Label(self.form_frame, text="Enter indices (0-3) separated by commas:").grid(row=4, column=1, sticky="w")
        self.categories_entry = ttk.Entry(self.form_frame, width=40)
        self.categories_entry.grid(row=5, column=1, pady=5, sticky="w")
        
        # Show available categories
        for i, (key, value) in enumerate(self.categories.items()):
            ttk.Label(self.form_frame, text=f"{i}: {value} ({key})").grid(row=6+i, column=1, sticky="w")
        
        ttk.Label(self.form_frame, text="Featured:").grid(row=10, column=0, sticky="w")
        self.featured_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(self.form_frame, variable=self.featured_var).grid(row=10, column=1, sticky="w")
        
        # Navigation controls
        self.control_frame = ttk.Frame(self.root)
        self.control_frame.grid(row=2, column=0, columnspan=2, pady=10)
        
        ttk.Label(self.control_frame, text="Image Folder:").pack(side="left", padx=5)
        self.folder_var = tk.StringVar(value=os.path.abspath("./images/todo"))
        self.folder_entry = ttk.Entry(self.control_frame, textvariable=self.folder_var, width=50)
        self.folder_entry.pack(side="left", padx=5)
        ttk.Button(self.control_frame, text="Browse", command=self.browse_metadata_folder).pack(side="left", padx=5)
        
        self.prev_btn = ttk.Button(self.control_frame, text="Previous", command=self.prev_image)
        self.prev_btn.pack(side="left", padx=5)
        
        self.next_btn = ttk.Button(self.control_frame, text="Next", command=self.next_image)
        self.next_btn.pack(side="left", padx=5)
        
        self.save_btn = ttk.Button(self.control_frame, text="Save JSON", command=self.save_metadata)
        self.save_btn.pack(side="right", padx=5)
        
        # Initialize
        self.current_image_index = 0
        self.image_files = []
        self.metadata = []
        
        # Configure grid weights
        self.root.columnconfigure(0, weight=1)
        self.root.columnconfigure(1, weight=1)
        self.root.rowconfigure(1, weight=1)
        
        # Load initial folder
        self.load_image_folder()
    
    def browse_input_folder(self):
        folder = filedialog.askdirectory(initialdir=self.input_folder.get())
        if folder:
            self.input_folder.set(folder)
    
    def browse_output_folder(self):
        folder = filedialog.askdirectory(initialdir=self.output_folder.get())
        if folder:
            self.output_folder.set(folder)
    
    def browse_metadata_folder(self):
        folder = filedialog.askdirectory(initialdir=self.folder_var.get())
        if folder:
            self.folder_var.set(folder)
            self.load_image_folder()
    
    def load_image_folder(self):
        folder = self.folder_var.get()
        if not os.path.isdir(folder):
            messagebox.showerror("Error", "Folder does not exist")
            return
        
        self.image_files = [
            f for f in os.listdir(folder) 
            if f.lower().endswith(('.jpg', '.jpeg', '.png'))
        ]
        
        if not self.image_files:
            messagebox.showinfo("Info", "No images found in selected folder")
            return
        
        self.current_image_index = 0
        self.load_current_image()
    
    def load_current_image(self):
        if not self.image_files:
            return
            
        folder = self.folder_var.get()
        filename = self.image_files[self.current_image_index]
        filepath = os.path.join(folder, filename)
        file_id = os.path.splitext(filename)[0]
        
        # Update file info
        self.file_id_label.config(text=file_id)
        self.title_entry.delete(0, tk.END)
        self.description_text.delete("1.0", tk.END)
        self.season_entry.delete(0, tk.END)
        self.categories_entry.delete(0, tk.END)
        self.featured_var.set(False)
        
        # Load image preview with correct orientation
        try:
            with Image.open(filepath) as img:
                self.original_width, self.original_height = img.size
                self.dimensions = f"{self.original_width}x{self.original_height}"

            img = Image.open(filepath)
            img = ImageOps.exif_transpose(img)  # Apply EXIF orientation
            img.thumbnail((400, 400), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(img)
            
            self.image_label.config(image=photo)
            self.image_label.image = photo
            
            # Try to load existing metadata
            self.load_existing_metadata(file_id)
        except Exception as e:
            self.image_label.config(text=f"Cannot load image: {str(e)}")
            self.dimensions = "0x0"  # Fallback dimensions
    
    def load_existing_metadata(self, file_id):
        """Try to load existing metadata from output.json"""
        output_path = os.path.join(self.folder_var.get(), "output.json")
        if os.path.exists(output_path):
            try:
                with open(output_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for item in data:
                        if item["id"] == file_id:
                            self.title_entry.insert(0, item.get("title", ""))
                            self.description_text.insert("1.0", item.get("description", ""))
                            self.season_entry.insert(0, item.get("season", ""))
                            
                            # Set categories
                            cat_indices = []
                            for cat in item.get("tags", []):
                                for i, key in enumerate(self.categories.keys()):
                                    if key == cat:
                                        cat_indices.append(str(i))
                            self.categories_entry.insert(0, ",".join(cat_indices))
                            
                            self.featured_var.set(item.get("featured", False))
                            break
            except:
                pass
    
    def prev_image(self):
        if self.current_image_index > 0:
            self.save_current_metadata()
            self.current_image_index -= 1
            self.load_current_image()
    
    def next_image(self):
        if self.current_image_index < len(self.image_files) - 1:
            self.save_current_metadata()
            self.current_image_index += 1
            self.load_current_image()
    
    def save_current_metadata(self):
        """Save metadata for current image"""
        if not self.image_files:
            return
            
        file_id = os.path.splitext(self.image_files[self.current_image_index])[0]
        title = self.title_entry.get()
        description = self.description_text.get("1.0", tk.END).strip()
        season = self.season_entry.get()
        
        # Process categories
        selected_categories = []
        indices_str = self.categories_entry.get()
        if indices_str:
            try:
                indices = [int(i.strip()) for i in indices_str.split(",")]
                category_keys = list(self.categories.keys())
                for i in indices:
                    if 0 <= i < len(category_keys):
                        selected_categories.append(category_keys[i])
            except ValueError:
                pass
        
        # Get current dates
        today = datetime.now().strftime("%Y-%m-%d")
        
        # Create metadata item
        item = {
            "id": file_id,
            "title": title,
            "description": description,
            "season": season,
            "tags": selected_categories,
            "camera": self.default_camera,
            "lens": self.default_lens,
            "dimension": self.dimensions,
            "udate": today,
            "tdate": today,
            "featured": self.featured_var.get()
        }
        
        # Update or add metadata
        if self.current_image_index < len(self.metadata):
            self.metadata[self.current_image_index] = item
        else:
            self.metadata.append(item)
    
    def save_metadata(self):
        """Save all metadata to JSON files"""
        if not self.image_files:
            return
            
        # Save current image metadata first
        self.save_current_metadata()
        
        folder = self.folder_var.get()
        output_path = os.path.join(folder, "output.json")
        portfolio_path = "./data/portfolio.json"
        
        try:
            # Save to output.json in working folder
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(self.metadata, f, ensure_ascii=False, indent=4)
            
            # Also add to portfolio.json
            portfolio_data = []
            if os.path.exists(portfolio_path):
                with open(portfolio_path, "r", encoding="utf-8") as f:
                    try:
                        portfolio_data = json.load(f)
                    except:
                        portfolio_data = []
            
            # Add new entries to beginning
            for item in reversed(self.metadata):
                # Remove existing entry if it exists
                portfolio_data = [x for x in portfolio_data if x["id"] != item["id"]]
                portfolio_data.insert(0, item)
            
            os.makedirs(os.path.dirname(portfolio_path), exist_ok=True)
            with open(portfolio_path, "w", encoding="utf-8") as f:
                json.dump(portfolio_data, f, ensure_ascii=False, indent=4)
            
            messagebox.showinfo("Success", "Metadata saved successfully")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save metadata: {str(e)}")
    
    def convert_to_webp(self, input_path, output_dir):
        """Convert image to WEBP with proper orientation"""
        filename = os.path.basename(input_path)
        name_without_ext = os.path.splitext(filename)[0]
        output_path = os.path.join(output_dir, f"{name_without_ext}.webp")
        
        try:
            # Load image with correct orientation
            img = Image.open(input_path)
            img = ImageOps.exif_transpose(img)
            
            img.save(
                output_path,
                format="WEBP",
                quality=self.webp_quality.get()
            )
            self.log(f"Converted: {filename} -> {name_without_ext}.webp")
            return True
        except Exception as e:
            self.log(f"Error converting {filename}: {str(e)}")
            return False
    
    def process_image(self, filename):
        """Process a single image"""
        input_path = os.path.join(self.input_folder.get(), filename)
        return self.convert_to_webp(input_path, self.output_folder.get())
    
    def convert_images(self):
        """Main conversion function"""
        input_folder = self.input_folder.get()
        output_folder = self.output_folder.get()
        
        if not os.path.isdir(input_folder):
            self.log("Error: Input folder does not exist")
            return
        
        os.makedirs(output_folder, exist_ok=True)
        
        self.log("Starting conversion...")
        
        # Get list of images
        image_files = [
            f for f in os.listdir(input_folder) 
            if f.lower().endswith(('.jpg', '.jpeg', '.png'))
        ]
        
        if not image_files:
            self.log("No images found for conversion")
            return
        
        # Process in parallel with 4 threads
        with ThreadPoolExecutor(max_workers=4) as executor:
            results = list(executor.map(self.process_image, image_files))
        
        success_count = sum(results)
        self.log(f"Conversion completed! Successful: {success_count}/{len(image_files)}")
        messagebox.showinfo("Complete", f"Conversion completed!\nSuccessful: {success_count}/{len(image_files)}")
    
    def start_conversion_thread(self):
        """Start conversion in a separate thread"""
        thread = threading.Thread(target=self.convert_images)
        thread.daemon = True
        thread.start()
    
    def log(self, message):
        """Log to text window"""
        self.log_text.config(state="normal")
        self.log_text.insert(tk.END, message + "\n")
        self.log_text.see(tk.END)
        self.log_text.config(state="disabled")
        self.root.update_idletasks()
    
    def clear_window(self):
        """Clear all widgets"""
        for widget in self.root.winfo_children():
            widget.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageToolsApp(root)
    root.mainloop()