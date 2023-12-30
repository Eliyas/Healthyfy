
import { useState, useEffect } from 'react';
import { Text } from 'react-native-ui-lib/src/components/text';
// import Config from 'react-native-config';



const useContentful = ({
    contentType,
    entry = null,
    fields = null,
    pageSize = 100,
}) => {
    const [content, setContent] = useState(null);
    const cache = new Map();

    async function loadContent() {
        try {
            console.log("enter")
            const params = {
                content_type: contentType,
                access_token: 'y03bqoeaTbdIVzVfsBq1sVSvFfKHE3ZTrHZCMHBJUsA',
            };
            if (entry) {
                params['sys.id'] = entry;
            }
            // Add fields parameter to request only specific fields, if provided
            if (fields) {
                params['select'] = fields.join(',');
            }
            const qs = new URLSearchParams(params).toString();
            const cacheKey = `https://cdn.contentful.com/spaces/g1mzbgdon51q/entries?${qs}`;
            console.log(cacheKey);
            const cachedContent = cache.get(cacheKey);
            if (cachedContent) {
                setContent(cachedContent);
                return;
            }
            const response = await fetch(`https://cdn.contentful.com/spaces/g1mzbgdon51q/entries?${qs}`);
            const data = await response.json();
            console.log("data", data)
            if (data) {
                setContent(data);
                cache.set(cacheKey, data);
            }
        } catch (err) {
            console.log('error: ', err);
        }
    }

    useEffect(() => {
        console.log("Calling effect")
        loadContent();
    }, []);

    // Paginate results
    const paginatedContent = content?.items?.reduce((acc, item, index) => {
        const pageIndex = Math.floor(index / pageSize);
        if (!acc[pageIndex]) {
            acc[pageIndex] = [];
        }
        acc[pageIndex].push(item);
        return acc;
    }, []);



    return paginatedContent;
};


export default useContentful;
