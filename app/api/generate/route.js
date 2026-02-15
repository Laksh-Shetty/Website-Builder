import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    try {
        const { category, contentPrompt, colorPrompt, functionalityPrompt } = await request.json();


        const cookieStore = await cookies();
        let credits = parseInt(cookieStore.get('user-credits')?.value || '10', 10);

        if (credits <= 0) {
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
        }


        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            return NextResponse.json({
                error: 'API Key Missing',
                details: 'Please add your valid Gemini API key to .env.local file. Get one at https://aistudio.google.com/'
            }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const defaultStructures = {
            landing: "A high-converting landing page with Hero section, Features grid, Testimonials, and CTA.",
            portfolio: "A personal portfolio with About Me, Project Gallery, Skills section, and Contact info.",
            ecommerce: "A product website with Image gallery, Price, Description, Reviews, and Add to Cart button.",
            blog: "A blog homepage with Featured post, Recent articles grid, Categories sidebar, and Newsletter signup.",
            contact: "A dedicated contact page with Form (Name, Email, Message), Map, and Social links.",
            dashboard: "A simple admin dashboard with Sidebar nav, Stats cards, distinct Data table, and User profile.",
            auth: "A centered Login/Signup card with Email/Password fields, Social login buttons, and Forgot Password link.",
            event: "An event registration page with Event details (Date, Time, Location), Speaker list, and Registration form.",
            consulting: "A consulting business page with Services offered, Case studies, Team section, and Booking CTA.",
            docs: "A documentation page with Sidebar navigation, Main content area with code blocks, and Table of Contents."
        };

        const structurePrompt = defaultStructures[category] || "Standard web page structure";

        const prompt = `
You are a senior frontend architect and expert web developer AI.

Your task is to generate a complete, working website based on the user's requirements.

=====================
USER INPUT
=====================
CATEGORY: ${category}
STRUCTURE GUIDANCE: ${structurePrompt}
CONTENT REQUIREMENTS: ${contentPrompt}
DESIGN/COLOR REQUIREMENTS: ${colorPrompt}
FUNCTIONALITY REQUIREMENTS: ${functionalityPrompt}

=====================
ARCHITECTURE RULES (STRICT)
=====================

1. The website must use ONLY 3 files:
   - index.html
   - style.css
   - script.js

2. The website must behave like a multi-page website BUT use a single index.html file.

3. index.html must:
   - Contain multiple <section class="page" id="..."> blocks.
   - ALWAYS include these base sections:
        - home
        - about
        - contact
   - Intelligently add additional sections that make sense for the CATEGORY.
     Examples:
        - portfolio → projects, skills
        - ecommerce → shop, products, cart
        - consulting → services, case-studies, team
        - blog → blog, categories
     Also add those pages which is there in CONTENT REQUIREMENTS.
     Decide automatically based on context.

4. Navigation system:
   - A universal navbar must exist.
   - Navbar links must correspond to ALL generated sections.
   - Only one section should be visible at a time.
   - Use JavaScript to toggle sections.
   - Use hash-based routing (example: #about, #services).
   - Update active nav link dynamically.
   - Scroll to top when switching sections.

5. style.css must:
   - Be universal for all sections.
   - Maintain consistent color system and spacing scale.
   - Be fully responsive.
   - Include modern layout techniques (Flexbox or Grid).
   - Include hover states and transitions.

6. script.js must:
   - Handle section visibility toggling.
   - Handle hash-based routing on page load.
   - Handle navbar active state switching.
   - Handle mobile menu toggle (if navbar collapses).
   - Be clean and modular.

7. Code Quality Requirements:
   - Use semantic HTML5.
   - Ensure accessibility (alt tags, labels, aria where needed).
   - No inline CSS.
   - No inline JavaScript.
   - Clean indentation.
   - Production-ready structure.

=====================
OUTPUT FORMAT (CRITICAL)
=====================

Return ONLY a strictly valid JSON object.
Do NOT include markdown.
Do NOT include explanations.
Do NOT include comments outside JSON.

The JSON object must have EXACTLY these three keys:

{
  "html": "...full index.html code here...",
  "css": "...full style.css code here...",
  "js": "...full script.js code here..."
}

The HTML must link:
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>

Ensure the JSON is syntactically valid.
Do NOT break quotes.
Do NOT truncate code.
Do NOT wrap in backticks.
`;



        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();


            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const generatedCode = JSON.parse(jsonStr);

            credits -= 1;
            cookieStore.set('user-credits', credits);

            return NextResponse.json({
                html: generatedCode.html,
                css: generatedCode.css,
                js: generatedCode.js,
                creditsRemaining: credits
            });

        } catch (genError) {
            console.error('Gemini Generation Error:', genError);
            return NextResponse.json({ error: 'Failed to generate content from AI' }, { status: 500 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
