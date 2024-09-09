const axios = require('axios');

const API_TOKEN = 'secret_hiFHnRj55vVjPyMTKku9gOzZg9WylVTvh1xHINaW86I'; // Replace with your real token
const PAGE_ID = 'c5a70e6f16154800a747dcadadd6a062'; // Replace with your real page ID

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
};

const data = {
    "children": [
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": "This is a new block of text added via the API."
                        }
                    }
                ]
            }
        }
    ]
};

axios.patch(`https://api.notion.com/v1/blocks/${PAGE_ID}/children`, data, { headers })
    .then(response => {
        console.log('Block added:', response.data);
    })
    .catch(error => {
        console.error('Error adding block:', error);
    });
