
    import React from 'react';

    export const studentPortfolioTemplate = {
      name: "My Professional Portfolio",
      theme: {
        mode: 'light', 
        primaryColor: '#4F46E5', // Indigo-600
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      pages: [
        {
          id: crypto.randomUUID(),
          name: "Home",
          elements: [
            {
              id: crypto.randomUUID(),
              type: "image",
              content: "Professional Headshot",
              imageUrl: "", 
              styles: { 
                width: "200px", 
                height: "200px", 
                borderRadius: "50%", 
                objectFit: "cover", 
                margin: "40px auto 20px auto", 
                display: "block",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "4px solid var(--primary-color)"
              },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "[Your Name]",
              styles: { 
                textAlign: "center", 
                fontSize: "3.5em", 
                fontWeight: "bold", 
                color: "var(--primary-color)", 
                margin: "0 0 10px 0",
                letterSpacing: "-0.025em"
              },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "[Your Title/Aspiration - e.g., Aspiring Software Engineer | Creative Designer | Future Innovator]",
              styles: { 
                textAlign: "center", 
                fontSize: "1.5em", 
                color: "#4B5563", // Cool Gray 600
                margin: "0 0 30px 0",
                fontWeight: "300"
              },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Welcome! I am a dedicated and ambitious student at Belvedere British School, passionate about [Your Core Passion, e.g., leveraging technology to solve real-world problems or expressing ideas through creative media]. This portfolio showcases my academic achievements, key projects, and the skills I've cultivated. I am eager to learn, grow, and contribute meaningfully.",
              styles: { 
                fontSize: "1.2em", 
                margin: "0 auto 40px auto", 
                textAlign: "center", 
                lineHeight: "1.7",
                maxWidth: "700px",
                color: "#374151" // Cool Gray 700
              },
            },
            {
              id: crypto.randomUUID(),
              type: "divider",
              styles: { margin: "40px auto", width: "50%", backgroundColor: "#D1D5DB", height:"2px" }, // Cool Gray 300
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Key Strengths",
              styles: { 
                fontSize: "2.5em", 
                fontWeight: "600", 
                marginTop: "30px", 
                marginBottom: "20px", 
                color: "var(--primary-color)",
                textAlign: "center"
              },
            },
            {
              id: crypto.randomUUID(),
              type: "text", // This could be a section with multiple text elements for better layout
              content: "•  [Strength 1, e.g., Analytical Problem Solving]\n•  [Strength 2, e.g., Collaborative Teamwork]\n•  [Strength 3, e.g., Creative Design Thinking]\n•  [Strength 4, e.g., Effective Communication]",
              styles: { 
                fontSize: "1.15em", 
                lineHeight: "1.8", 
                margin: "0 auto",
                maxWidth: "600px",
                textAlign: "left",
                whiteSpace: "pre-line",
                padding: "10px 20px",
                backgroundColor: "#F9FAFB", // Cool Gray 50
                borderRadius: "8px",
                color: "#374151" // Cool Gray 700
              },
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          name: "Projects Showcase",
          elements: [
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Featured Projects",
              styles: { 
                fontSize: "3em", 
                fontWeight: "bold", 
                textAlign: "center", 
                color: "var(--primary-color)", 
                padding: "40px 0 10px 0" 
              },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "A curated selection of my work, demonstrating practical application of my skills and knowledge.",
              styles: { 
                fontSize: "1.2em", 
                textAlign: "center", 
                marginBottom: "40px", 
                lineHeight: "1.6",
                color: "#4B5563" // Cool Gray 600
              },
            },
            // Project 1
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Project Title 1: [e.g., Eco-Friendly Initiative App]",
              styles: { fontSize: "2em", fontWeight: "600", color: "var(--primary-color)", marginTop: "30px", marginBottom: "10px" },
            },
            {
              id: crypto.randomUUID(),
              type: "image",
              content: "Image for Project 1",
              imageUrl: "",
              styles: { width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Brief overview of the project: its objectives, my role, technologies/methodologies used, and key outcomes or learnings. Highlight challenges overcome and impact achieved.",
              styles: { fontSize: "1.1em", lineHeight: "1.7", marginBottom: "15px", color: "#374151" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Skills Applied: [e.g., Python, UI/UX Design, Project Management]",
              styles: { fontSize: "1em", fontStyle: "italic", color: "#6B7280" }, // Cool Gray 500
            },
            {
              id: crypto.randomUUID(),
              type: "divider",
              styles: { margin: "50px 0", backgroundColor: "#E5E7EB" }, // Cool Gray 200
            },
            // Project 2
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Project Title 2: [e.g., Historical Research Paper]",
              styles: { fontSize: "2em", fontWeight: "600", color: "var(--primary-color)", marginTop: "30px", marginBottom: "10px" },
            },
            {
              id: crypto.randomUUID(),
              type: "image",
              content: "Image for Project 2 (Optional)",
              imageUrl: "",
              styles: { width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Detailed description of this project. Focus on the research process, analytical skills demonstrated, and the significance of the findings or creative output.",
              styles: { fontSize: "1.1em", lineHeight: "1.7", marginBottom: "15px", color: "#374151" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Skills Applied: [e.g., Critical Analysis, Academic Writing, Research Methodology]",
              styles: { fontSize: "1em", fontStyle: "italic", color: "#6B7280" },
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          name: "Skills & Expertise",
          elements: [
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Core Competencies",
              styles: { fontSize: "3em", fontWeight: "bold", textAlign: "center", color: "var(--primary-color)", padding: "40px 0 10px 0" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "A summary of technical and soft skills I bring to the table.",
              styles: { fontSize: "1.2em", textAlign: "center", marginBottom: "40px", lineHeight: "1.6", color: "#4B5563" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Technical Proficiencies:",
              styles: { fontSize: "1.8em", fontWeight: "600", color: "var(--primary-color)", marginTop: "20px", marginBottom: "10px" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "- Programming Languages: [e.g., Python (Proficient), Java (Intermediate), C++ (Basic)]\n- Software & Tools: [e.g., Microsoft Office Suite (Expert), Adobe Creative Cloud (Intermediate), Figma (Proficient)]\n- Methodologies: [e.g., Agile, Scrum (Familiar)]",
              styles: { fontSize: "1.1em", whiteSpace: "pre-line", margin: "10px 0 30px 0", lineHeight: "1.8", color: "#374151" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Interpersonal Skills:",
              styles: { fontSize: "1.8em", fontWeight: "600", color: "var(--primary-color)", marginTop: "20px", marginBottom: "10px" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "- Communication: Articulate in presenting ideas and reports.\n- Leadership: Experience in leading small teams for class projects.\n- Adaptability: Quick learner, able to adjust to new challenges.\n- Problem-Solving: Strong analytical skills to identify and resolve issues.",
              styles: { fontSize: "1.1em", whiteSpace: "pre-line", margin: "10px 0 30px 0", lineHeight: "1.8", color: "#374151" },
            },
          ]
        },
        {
          id: crypto.randomUUID(),
          name: "Contact Me",
          elements: [
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Let's Connect",
              styles: { fontSize: "3em", fontWeight: "bold", textAlign: "center", color: "var(--primary-color)", padding: "40px 0 10px 0" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "I am enthusiastic about discussing potential opportunities, collaborations, or simply exchanging ideas. Please feel free to reach out.",
              styles: { fontSize: "1.2em", textAlign: "center", marginBottom: "30px", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto 30px auto", color: "#4B5563" },
            },
            {
              id: crypto.randomUUID(),
              type: "text",
              content: "Email: [your.bbs.email@belvederebritishschool.ae]\nLinkedIn: [Your LinkedIn Profile URL (Highly Recommended)]\nGitHub: [Your GitHub Profile URL (If Applicable)]",
              styles: { 
                fontSize: "1.15em", 
                textAlign: "center", 
                whiteSpace: "pre-line", 
                lineHeight: "2",
                padding: "20px",
                backgroundColor: "#F3F4F6", // Cool Gray 100
                borderRadius: "8px",
                color: "#1F2937", // Cool Gray 800
                maxWidth: "500px",
                margin: "0 auto"
              },
            },
          ],
        },
      ],
    };
  