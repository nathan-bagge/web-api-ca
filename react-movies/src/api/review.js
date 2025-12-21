const authHeader = () => ({ Authorization: localStorage.getItem("token") || "" });

export const getMyReviews = async () => {
    const res = await fetch('http://localhost:8080/api/reviews/user/me', { headers: authHeader() });
    return res.json();
};

export const addReview = async (movieId, rating, reviewText) => {
    const res = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ movieId, rating, reviewText })
    });
     if (!res.ok) throw new Error(await res.text());
    return res.json();
};

export const updateReview = async (id, rating, reviewText) => {
    const res = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ rating, reviewText })
    });
    return res.json();
};

export const deleteReview = async (id) => {
    const res = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'DELETE',
        headers: authHeader()
    });
    return res.json();
};