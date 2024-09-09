const axios = require('axios');

const API_TOKEN = 'secret_hiFHnRj55vVjPyMTKku9gOzZg9WylVTvh1xHINaW86I'; // Replace with your real token
const PAGE_ID = 'c5a70e6f16154800a747dcadadd6a062'; // Replace with the ID of the page you want to retrieve content from

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
};

// Recursive function to retrieve all block children
const getBlockChildren = async (blockId) => {
    try {
        const response = await axios.get(`https://api.notion.com/v1/blocks/${blockId}/children`, { headers });
        const blockContent = response.data.results;

        // For blocks that contain children, recursively get their content
        for (let block of blockContent) {
            if (block.has_children) {
                block.children = await getBlockChildren(block.id);
            }
        }

        return blockContent;
    } catch (error) {
        console.error('Error retrieving block children:', error.response ? error.response.data : error);
    }
};

// Function to retrieve the entire page content
const getPageContent = async () => {
    try {
        // Fetch the page's main block content
        const pageBlocks = await getBlockChildren(PAGE_ID);

        console.log('Page content retrieved:', JSON.stringify(pageBlocks, null, 2));
    } catch (error) {
        console.error('Error retrieving page content:', error.response ? error.response.data : error);
    }
};

getPageContent();
