const axios = require('axios');

const API_TOKEN = 'secret_hiFHnRj55vVjPyMTKku9gOzZg9WylVTvh1xHINaW86I'; // Replace with your real token
const BLOCK_ID = '9607b55212ad484482b64874d67b9c45'; // Replace with your real block ID

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
};

const data = {
    "paragraph": {
        "rich_text": [
            {
                "type": "text",
                "text": {
                    "content": "Updated block content."
                }
            }
        ]
    }
};

axios.patch(`https://api.notion.com/v1/blocks/${BLOCK_ID}`, data, { headers })
    .then(response => {
        console.log('Block updated:', response.data);
    })
    .catch(error => {
        console.error('Error updating block:', error);
    });
