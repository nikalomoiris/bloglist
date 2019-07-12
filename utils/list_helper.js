const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item;
    };

    return blogs.map(blog => blog.likes).reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const favLikes = blogs
        .map(blog => blog.likes)
        .reduce((a, b) => Math.max(a, b));
    return blogs.filter(blog => blog.likes === favLikes)[0];
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};