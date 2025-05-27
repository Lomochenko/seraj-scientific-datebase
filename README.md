# Seraj - Scientific Database Homepage

This project is the homepage for 'Seraj' website, designed to showcase a scientific database with over 135 million records.

## About the Project

Seraj is a comprehensive scientific database that includes various types of academic resources:
- Papers: 77,443,424 records
- Books: 456,073 records
- Theses: 311,099 records
- And other scientific resources

## Page Features

### Design & Appearance
- Inspired by top scientific database websites
- Responsive and mobile-friendly
- Bilingual (Persian/English)
- Loading skeleton animations
- Academic color scheme

### Main Sections
1. **Hero** - Search and overall statistics display
2. **Tutorial** - Four steps guide for using the site
3. **Top Lists** - Leading researchers, universities, and countries
4. **Charts** - Statistical data visualization
5. **Footer** - Links and contact information

### Technology
I used pure HTML, CSS, and JavaScript along with:
- Bootstrap 5 for responsive design
- Chart.js for charts
- AOS for animations
- Font Awesome for icons

## File Structure

```
seraj-scientific-database/
├── index.html              # Main page
├── css/
│   ├── style.css          # Main styles
│   └── responsive.css     # Mobile styles
├── js/
│   ├── main.js           # Main site logic
│   ├── charts.js         # Charts
│   └── animations.js     # Animations
└── README.md             # This file
```

## How to Run

### With Python (easiest way)
```bash
python -m http.server 8000
```
Then go to `http://localhost:8000`

OR

### With Live Server in your IDE


### With Node.js
```bash
npm install -g http-server
http-server -p 8000
```

## Special Features

### Search
- Main search bar in hero section
- Loading animation for search button
- Toast notifications for results

### Animations
- Skeleton loading that activates based on scroll position
- Counter animations for statistics
- Smooth transitions between sections
- Hover effects on cards

### Charts
- Pie chart for general categories
- Bar chart for specialized topics
- Loading animations for charts
- Responsive and interactive

### Multilingual
- Language switching without page refresh
- Text direction change (RTL/LTR)
- Complete translation of all elements

## Browsers

Tested on:
- Chrome (latest version)
- Firefox
- Safari
- Edge

## Important Notes

- This is only the homepage (frontend)
- For complete implementation, it needs a backend
- Data is currently static
- Ready for integration with Django
