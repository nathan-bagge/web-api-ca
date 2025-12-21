import { AuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMyReviews } from "../api/review";


const ProfilePage = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const loadReviews = () => getMyReviews().then(setReviews);
    
    useEffect(() => { loadReviews(); }, []);
    
    return context.isAuthenticated ? (
       <div className ="login-page">
        <h2>Profile Page</h2>
        <p>Welcome, {context.userName}!</p>
        <h3>Your Reviews:</h3>
        {reviews.length === 0 ? (
            <p>You have not submitted any reviews yet.</p>
        ) : (
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        <strong>Movie ID:</strong> {review.movieId} <br />
                        <strong>Rating:</strong> {review.rating} <br />
                        <strong>Review:</strong> {review.reviewText}
                    </li>
                ))}
            </ul>
        )}
       </div>
    ) : (
        <p>
            You must log in to see your profile! {" "}
            <button onClick={() => navigate('/login')}>Login</button>
      </p>
    );
};

export default ProfilePage;