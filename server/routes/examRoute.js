const router = require('express').Router();
const authenticate = require("../middlewares/authMiddleware");

// Get quiz questions route:
router.get("/quiz-questions", authenticate, async (req, res) => {
    try {
        const questions = [
            {
                "question": "What does HTML stand for?",
                "options": ["HyperText Markup Language", "HomeTool Markup Language", "Hyperlinks and Text Markup Language", "HyperText Machine Language"]
            },
            {
                "question": "Which HTML element is used to define the title of a document?",
                "options": ["<title>", "<head>", "<meta>", "<style>"]
            },
            {
                "question": "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
                "options": ["alt", "src", "href", "title"]
            },
            {
                "question": "Which HTML element is used for the largest heading?",
                "options": ["<h1>", "<heading>", "<h6>", "<head>"]
            },
            {
                "question": "Which HTML attribute is used to define inline styles?",
                "options": ["style", "class", "id", "css"]
            },
            {
                "question": "How can you create an ordered list in HTML?",
                "options": ["<ol>", "<ul>", "<li>", "<dl>"]
            },
            {
                "question": "Which HTML element is used to define a table row?",
                "options": ["<tr>", "<td>", "<th>", "<table>"]
            },
            {
                "question": "How can you make a numbered list in HTML?",
                "options": ["<ol>", "<ul>", "<dl>", "<list>"]
            },
            {
                "question": "Which HTML element is used to define a list item?",
                "options": ["<li>", "<ul>", "<ol>", "<dl>"]
            },
            {
                "question": "Which HTML element is used to define a hyperlink?",
                "options": ["<a>", "<link>", "<href>", "<hyperlink>"]
            },
            {
                "question": "Which attribute is used to specify a unique id for an HTML element?",
                "options": ["id", "class", "name", "type"]
            },
            {
                "question": "Which HTML element is used to define a paragraph?",
                "options": ["<p>", "<br>", "<pre>", "<div>"]
            },
            {
                "question": "Which HTML element is used to define emphasized text?",
                "options": ["<em>", "<i>", "<strong>", "<b>"]
            },
            {
                "question": "Which HTML attribute is used to define the URL of an image?",
                "options": ["src", "href", "alt", "link"]
            },
            {
                "question": "Which HTML element is used to define the body of the document?",
                "options": ["<body>", "<head>", "<html>", "<meta>"]
            }
        ];

        res.status(200).send({
            message: "Quiz questions fetched successfully",
            success: true,
            data: questions
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
