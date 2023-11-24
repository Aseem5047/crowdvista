import axios from 'axios';

// Function to filter images based on parameters
export const filterImages = async (filterParams) => {
    try {
        // Fetch all images
        const response = await axios.get('/getImages');
        const allImages = response.data; // Assuming the response is an array of images

        // Implement your filtering logic based on filterParams
        // For example, you can filter by name, date, or any other criteria
        // This is just a simple example, modify it based on your needs

        const filteredImages = allImages.filter(image => {
            return image.name.includes(filterParams.keyword);
        });

        return filteredImages;
    } catch (error) {
        console.error('Error fetching and filtering images:', error);
        throw error;
    }
};
