# Vertex AI Grounding and Function Calling Example

## Overview
This project demonstrates how to use Google Vertex AI to ground responses and perform function calling in a Node.js environment. The grounding helps ensure the responses are factually accurate, while function calling enables real-time interaction with external APIs or services.

## Features
- Uses Google Vertex AI for generating grounded responses.
- Google Search integration for real-time information retrieval.
- Function calling to external services (e.g., weather API/mock).

## Prerequisites
- Node.js installed
- Google Cloud project with Vertex AI enabled
- API keys for Google Cloud and any external services used (e.g., weather API)

## Setup Instructions
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd vertex-ai-grounding-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the required environment variables:
   ```env
   PROJECT_ID=your_project_id_here
   LOCATION=your_location_here
   ```

4. Run the application:
   ```bash
   node index.js
   ```

## Resources
- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [Google Search API](https://developers.google.com/custom-search/v1/overview)
- [Grounding and Function Calling — A Journey of Learning and Applying Generative AI — Milestone 7](https://medium.com/@dorangao/grounding-and-function-calling-a-journey-of-learning-and-applying-generative-ai-milestone-7-8c39d13ae5ec)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to use this project as a starting point for integrating Google Vertex AI grounding and function calling capabilities in your own Node.js applications.

