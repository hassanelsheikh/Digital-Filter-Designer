**Digital Filter Designer**

**Description:**
This project implements a web application for designing custom digital filters by placing zeros and poles on the z-plane. It provides a user-friendly interface with interactive features for modifying filter elements and visualizing frequency responses. Users can also apply the designed filter to real-time signal processing, adjust filtering speed, and correct phase using All-Pass filters.

**Features:**
1. Z-plane Plot: Allows users to place, modify, and delete zeros and poles. Provides options to clear elements and add conjugates for complex elements.
2. Frequency Response Plot: Displays magnitude and phase response graphs corresponding to the placed filter elements.
3. Real-time Filtering: Applies the designed filter to lengthy signals with adjustable processing speed, visualizing both original and filtered signal time progress.
4. All-Pass Filter Library: Offers a library of All-Pass filters for phase correction, allowing users to select and integrate suitable filters into the design.
5. Custom All-Pass Design: Enables users to create custom All-Pass filters by specifying parameters and calculates their phase response for integration.
6. Toggle All-Pass Elements: Allows users to enable/disable added All-Pass elements for flexible filter adjustment.

**Tools Used:**
- Python (Flask): Backend server framework for handling HTTP requests and responses.
- JavaScript: Frontend scripting language for interactive features and dynamic content.
- HTML: Markup language for structuring web pages.
- CSS: Styling language for enhancing the appearance and layout of web pages.

**How to Run:**
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install Python and Flask if not already installed.
4. Run `python app.py` to start the Flask server.
5. Open your web browser and go to `http://localhost:5000` to access the application.

**Snap Shots**
![image](https://github.com/hassanelsheikh/Digital-Filter-Designer/assets/101064451/8d4dd60a-76a2-479b-9535-7cdcadec2803)

![image](https://github.com/hassanelsheikh/Digital-Filter-Designer/assets/101064451/9a742842-af88-48e5-9041-c9bb5f9e1f2f)

