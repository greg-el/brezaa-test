// -------------------------------------------------
// In real life this would connect to a SQL database
// -------------------------------------------------

class ReviewRepository {
  constructor() {
    this.reviews = [];
  }

  createReview(body, id) {
    let data = {
      sellerId: id,
      reviewValue: body.reviewValue,
      comment: body.comment,
    };
    this.reviews.push(data);
    return { ...data };
  }

  getReviewsBySellerId(id) {
    let out = [];
    for (let review of this.reviews) {
      if (review.sellerId == id) {
        out.push(review);
      }
    }
    return out;
  }
}

module.exports = ReviewRepository;
