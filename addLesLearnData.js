const axios = require('axios');

const API_TOKEN = 'secret_J4nRAtODxzVZTqY2DovV4onUytyJSiSKYyx00gLQNBW'; // Replace with your actual token
const PAGE_ID = 'ade7a916ca3e4267b3b19bf95ac4cc93'; // Replace with your actual page ID

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
};

// Example JSON Data
const data = {
    "topicName": "Introduction to Go (Golang)",
    "subTopics": [
        "What is Go?",
        "Go vs Other Languages",
        "Go Syntax Basics",
        "Running Go Programs"
    ],
    "questions": {
        "What is Go?": {
            "Explanation": "Go, also known as Golang, is an open-source programming language developed by Google. It is designed for building fast, reliable, and efficient software at scale, with a focus on simplicity and performance.",
            "QuestionsAndAnswers": [
                {
                    "Question": "What are the main features of Go?",
                    "Answer": "Go is known for its simplicity, fast compilation, efficient concurrency, and robust standard library, making it ideal for building scalable and high-performance applications."
                },
                {
                    "Question": "Why was Go created?",
                    "Answer": "Go was created to address issues with existing languages like slow compilation and complexity in large-scale software systems, providing a simple, fast, and efficient alternative."
                },
                {
                    "Question": "Is Go a compiled or interpreted language?",
                    "Answer": "Go is a compiled language, which means it is converted directly into machine code, allowing for fast execution."
                },
                {
                    "Question": "What are common use cases for Go?",
                    "Answer": "Go is commonly used for building web servers, distributed systems, cloud services, and command-line tools due to its efficiency and concurrency model."
                },
                {
                    "Question": "Who uses Go?",
                    "Answer": "Go is used by companies like Google, Uber, Dropbox, and many others for developing high-performance applications."
                }
            ]
        },
        "Go vs Other Languages": {
            "Explanation": "Go is often compared to languages like C, Java, and Python. It combines the performance of C with the simplicity of Python, making it a strong choice for modern software development.",
            "QuestionsAndAnswers": [
                {
                    "Question": "How does Go compare to C?",
                    "Answer": "Go is similar to C in terms of performance but has a simpler syntax and better memory management, including garbage collection, which reduces the risk of memory leaks."
                },
                {
                    "Question": "Why might someone choose Go over Python?",
                    "Answer": "Go is chosen over Python for projects that require high performance and efficient concurrency, such as network servers, where Go's speed and scalability are critical."
                },
                {
                    "Question": "What are the key differences between Go and Java?",
                    "Answer": "Go is generally simpler and faster than Java, with a more lightweight runtime and better support for concurrency. Java, however, has a more mature ecosystem and wider usage."
                },
                {
                    "Question": "Is Go more performant than Python?",
                    "Answer": "Yes, Go is more performant than Python because it is a compiled language and is designed for efficiency, making it better suited for CPU-bound tasks."
                },
                {
                    "Question": "Can Go replace C++ for system-level programming?",
                    "Answer": "While Go can be used for system-level programming, C++ still offers more control over hardware and memory. However, Go simplifies concurrency and is easier to learn."
                }
            ]
        },
        "Go Syntax Basics": {
            "Explanation": "Go's syntax is designed to be clean and concise, with features like strict typing, simplified error handling, and built-in support for concurrency through goroutines.",
            "QuestionsAndAnswers": [
                {
                    "Question": "How does Go handle variables?",
                    "Answer": "Variables in Go are declared using the 'var' keyword, with type inference available through the shorthand ':='. All variables in Go must be initialized before use."
                },
                {
                    "Question": "What are goroutines?",
                    "Answer": "Goroutines are lightweight threads managed by the Go runtime, enabling concurrent execution of functions with minimal overhead."
                },
                {
                    "Question": "How does Go handle error management?",
                    "Answer": "Go uses explicit error handling where functions return an error value alongside the result, allowing developers to handle errors explicitly at each step."
                },
                {
                    "Question": "What are Go's basic data types?",
                    "Answer": "Go's basic data types include integers, floats, strings, booleans, arrays, slices, maps, and structs, each designed for simplicity and efficiency."
                },
                {
                    "Question": "How are loops structured in Go?",
                    "Answer": "Go only has one loop construct, the 'for' loop, which can be used for both traditional iteration and as a 'while' loop by omitting certain components."
                }
            ]
        },
        "Running Go Programs": {
            "Explanation": "Go programs are typically compiled and run from the command line using the 'go' tool. The Go compiler produces a single binary executable, which can be easily distributed and run on any compatible system.",
            "QuestionsAndAnswers": [
                {
                    "Question": "How do you compile and run a Go program from the command line?",
                    "Answer": "To compile a Go program, use 'go build', which generates an executable file. Run the program using './programName'. Alternatively, 'go run' can compile and run the program in one step."
                },
                {
                    "Question": "What is the Go workspace?",
                    "Answer": "The Go workspace is a directory structure that organizes Go code into packages and modules. It typically includes directories like 'src' for source code and 'bin' for executables."
                },
                {
                    "Question": "What is the purpose of the 'go.mod' file?",
                    "Answer": "The 'go.mod' file is used to define the module's dependencies, ensuring that the correct versions of external packages are used and simplifying dependency management."
                },
                {
                    "Question": "Can Go programs be cross-compiled?",
                    "Answer": "Yes, Go's 'go build' command supports cross-compilation, allowing you to compile programs for different operating systems and architectures from a single development machine."
                },
                {
                    "Question": "How do you test Go code?",
                    "Answer": "Go has a built-in testing framework, and you can write tests alongside your code. Tests are run using the 'go test' command, which automatically detects and runs tests in your project."
                }
            ]
        }
    }
};

// Function to create blocks for subtopics and questions
const createBlocksForSubtopics = (data) => {
    const blocks = [];

    // Add main topic title
    blocks.push({
        "object": "block",
        "type": "heading_1",
        "heading_1": {
            "rich_text": [
                {
                    "type": "text",
                    "text": {
                        "content": data.topicName
                    }
                }
            ]
        }
    });

    // Loop through each subtopic
    data.subTopics.forEach(subTopic => {
        // Add subtopic as a heading_2 block
        blocks.push({
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": subTopic
                        }
                    }
                ]
            }
        });

        // Add explanation as a paragraph block (if exists)
        const explanation = data.questions[subTopic]?.Explanation;
        if (explanation) {
            blocks.push({
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": explanation
                            }
                        }
                    ]
                }
            });
        }

        // Add questions and answers
        const questionsAndAnswers = data.questions[subTopic]?.QuestionsAndAnswers;
        if (questionsAndAnswers) {
            questionsAndAnswers.forEach(qa => {
                // Add question
                blocks.push({
                    "object": "block",
                    "type": "heading_3",
                    "heading_3": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": qa.Question
                                }
                            }
                        ]
                    }
                });

                // Add answer as paragraph block
                blocks.push({
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": qa.Answer
                                }
                            }
                        ]
                    }
                });
            });
        }
    });

    return blocks;
};

// Create blocks from the provided data
const blocks = createBlocksForSubtopics(data);

// Send request to Notion API to append the blocks
axios.patch(`https://api.notion.com/v1/blocks/${PAGE_ID}/children`, { children: blocks }, { headers })
    .then(response => {
        console.log('Blocks added:', response.data);
    })
    .catch(error => {
        console.error('Error adding blocks:', error);
    });
