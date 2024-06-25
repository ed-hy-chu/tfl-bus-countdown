# tfl-bus-countdown
Web-based TfL bus countdown display (for selected bus stops).

### Principle
The web application is made using Javascript to fetch the next bus data (route, destination, registration number, estimated time of arrival) from the StopPoint API provided by TfL. The registration number is then looked up against a JSON database of vehicle data to obtain the vehicle type. The application finally draws the output using Canvas API.

### Usage
With all files maintained in the directory structure, open any of the following files with a modern web browser:
- `hbc_a.html`: Hackbridge Corner (Eastbound)
- `hbc_b.html`: Hackbridge Station (Westbound)
- `par.html`: Westminster / Parliament Square
- `wag_e.html`: Croydon Road / Wallington Green (Eastbound)
- `wag_w.html`: Croydon Road / Wallington Green (Westbound)

### Demonstration

### Disclaimer
- This is a personal non-profit, non-commerical project and is not maintained regularly.
- This project was originally not intended for public release. It is now available to the public for a limited time for job application purposes only (no copyright infringement intended). I would like to acknowledge the following resources:
  - The bus fleet data is obtained from https://bustimes.org/.
  - The TfL roundel was re-created by myself and it is not intended to replace any official applications or services.
  - The Axion Dotmap font made by BenTheMiner.
  - The Railway font made by Greg Fleming.
  - HTML5 Boilerplate (https://html5boilerplate.com/).
  - normalize.css by necolas (https://github.com/necolas/normalize.css).
  - modernizr (https://modernizr.com).
