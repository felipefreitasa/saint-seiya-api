class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.paginationData = {}; 
  }

  async paginate() {
    const totalItems = await this.query.model.countDocuments(); 

    const limit = this.queryString.limit ? Number(this.queryString.limit) : 20; 
    const page = this.queryString.page ? Number(this.queryString.page) : 1; 
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    this.paginationData = {
      totalItems,
      totalPages,
      currentPage: page,
      perPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return this;
  }
}

module.exports = APIFeatures;
