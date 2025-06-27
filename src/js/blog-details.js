document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('blog-details-container');
    container.innerHTML = '<div class="text-center text-gray-500">Loading...</div>';

    // Get blog id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    if (!blogId) {
        container.innerHTML = '<div class="text-center text-red-500">No blog post specified.</div>';
        return;
    }

    try {
        const response = await fetch('./src/data/blog.json');
        const data = await response.json();
        const blog = data.blogs.find(b => String(b.id) === String(blogId));
        if (!blog) {
            container.innerHTML = '<div class="text-center text-red-500">Blog post not found.</div>';
            return;
        }

        container.innerHTML = `
            <article>
                <img src="${blog.image || 'https://via.placeholder.com/800x400?text=No+Image'}" alt="${blog.title}" class="w-full h-64 object-cover rounded mb-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">${blog.title}</h1>
                <div class="flex items-center text-gray-500 text-sm mb-4">
                    <span class="mr-4"><i class="far fa-calendar-alt mr-1"></i>${blog.date || ''}</span>
                    <span class="mr-4"><i class="far fa-clock mr-1"></i>${blog.readTime || ''}</span>
                    <span><i class="far fa-eye mr-1"></i>${blog.views || '0'}</span>
                </div>
                <span class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">${blog.category || 'General'}</span>
                <div class="prose max-w-none text-gray-700 whitespace-pre-line">${blog.description}</div>
            </article>
        `;
    } catch (error) {
        container.innerHTML = `<div class="text-center text-red-500">Error loading blog post.<br>${error.message}</div>`;
    }
}); 