TRUNCATE gallery_images, testimonials, contact_messages, reservations, menu_items RESTART IDENTITY;

INSERT INTO menu_items (category, name, description, price, image_url, is_featured) VALUES
('Appetizers', 'Crispy Calamari', 'Lightly fried calamari served with zesty marinara and herb aioli.', 14.00, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80', true),
('Appetizers', 'Bruschetta', 'Toasted sourdough topped with tomatoes, basil, garlic, and olive oil.', 10.00, 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=900&q=80', false),
('Main Courses', 'Grilled Salmon', 'Perfectly grilled salmon with asparagus, lemon butter, and sea salt.', 22.00, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80', true),
('Main Courses', 'Filet Mignon', 'Tender 8oz filet with creamy mashed potatoes and red wine reduction.', 35.00, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80', true),
('Main Courses', 'Lobster Risotto', 'Creamy Arborio risotto with butter-poached lobster and parmesan.', 28.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80', false),
('Desserts', 'Tiramisu', 'Classic coffee-soaked layers with mascarpone cream and cocoa dust.', 9.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80', true),
('Desserts', 'Chocolate Lava Cake', 'Warm molten chocolate center served with vanilla bean gelato.', 10.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', false);

INSERT INTO testimonials (customer_name, quote, avatar_url, rating) VALUES
('Jane Doe', 'The food was absolutely divine. Every course felt curated and memorable.', 'https://randomuser.me/api/portraits/women/45.jpg', 5),
('John Smith', 'Exceptional service and atmosphere. The filet mignon was cooked perfectly.', 'https://randomuser.me/api/portraits/men/32.jpg', 5),
('Ariana Patel', 'Elegant without feeling stiff. It has become our favorite dinner spot.', 'https://randomuser.me/api/portraits/women/68.jpg', 5);

INSERT INTO gallery_images (title, image_url, alt_text) VALUES
('Signature Steak', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', 'Plated steak on a dark table'),
('Dining Room', 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=900&q=80', 'Restaurant dining interior with warm lights'),
('Fresh Pasta', 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=80', 'Fresh pasta served on white plate'),
('Seasonal Dessert', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80', 'Dessert with berries and cream');
