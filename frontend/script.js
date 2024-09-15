const apiUrl = 'https://explore-fsrq.onrender.com';

// Function to fetch and display blog posts
async function fetchBlogs() {
    try {
        const response = await fetch(`${apiUrl}/blogs`);
        const blogs = await response.json();
        const blogContainer = document.getElementById('blogs');

        blogContainer.innerHTML = ''; // Clear the container before displaying blogs

        blogs.forEach(blog => {
            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog');

            const title = document.createElement('h2');
            title.classList.add('blog-title');
            title.innerText = blog.title;

            const content = document.createElement('p');
            content.classList.add('blog-content');
            content.innerText = blog.content;

            blogDiv.appendChild(title);
            blogDiv.appendChild(content);
            blogContainer.appendChild(blogDiv);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

// Function to create a new blog post
async function createBlog() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        alert('Please fill in both fields');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            alert('Blog post created successfully');
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            fetchBlogs(); // Refresh the blog list
        } else {
            alert('Failed to create blog post');
        }
    } catch (error) {
        console.error('Error creating blog:', error);
    }
}

// Fetch blogs when the page loads
window.onload = fetchBlogs;
