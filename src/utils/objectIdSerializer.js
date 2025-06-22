/**
 * Utility functions to handle MongoDB ObjectID serialization issues
 */

/**
 * Recursively converts MongoDB ObjectID objects to strings in a data structure
 * @param {any} data - The data to process
 * @returns {any} - The processed data with ObjectIDs converted to strings
 */
export function serializeObjectIds(data) {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeObjectIds(item));
  }

  // Handle objects
  if (typeof data === 'object') {
    // Check if it's a MongoDB ObjectID
    if (data._bsontype === 'ObjectID' && data.id) {
      try {
        // Try to use toString method if available
        if (typeof data.toString === 'function') {
          return data.toString();
        }
        // Fallback: convert the buffer to a hex string
        if (Buffer.isBuffer(data.id)) {
          return data.id.toString('hex');
        }
        // Another fallback: try to access the id as a string
        return String(data.id);
      } catch (error) {
        console.warn('Error serializing ObjectID:', error);
        return String(data.id);
      }
    }

    // Process regular objects
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = serializeObjectIds(value);
    }
    return result;
  }

  // Return primitives as-is
  return data;
}

/**
 * Specifically handles the votedBy field serialization
 * @param {Array} votedBy - The votedBy array from a post
 * @returns {Array} - The processed votedBy array
 */
export function serializeVotedBy(votedBy) {
  if (!Array.isArray(votedBy)) {
    return [];
  }

  return votedBy.map(vote => {
    if (typeof vote === 'object' && vote !== null) {
      return {
        ...vote,
        userId: serializeObjectIds(vote.userId),
        _id: serializeObjectIds(vote._id)
      };
    }
    return vote;
  });
}

/**
 * Processes a post object to fix ObjectID serialization issues
 * @param {Object} post - The post object
 * @returns {Object} - The processed post object
 */
export function serializePost(post) {
  if (!post || typeof post !== 'object') {
    return post;
  }

  return {
    ...post,
    votedBy: serializeVotedBy(post.votedBy),
    approvedBy: Array.isArray(post.approvedBy) ? post.approvedBy.map(id => serializeObjectIds(id)) : post.approvedBy,
    rejectedBy: Array.isArray(post.rejectedBy) ? post.rejectedBy.map(id => serializeObjectIds(id)) : post.rejectedBy,
    bookmarkedBy: Array.isArray(post.bookmarkedBy) ? post.bookmarkedBy.map(id => serializeObjectIds(id)) : post.bookmarkedBy,
    reportedBy: Array.isArray(post.reportedBy) ? post.reportedBy.map(id => serializeObjectIds(id)) : post.reportedBy,
    _id: serializeObjectIds(post._id),
    userId: serializeObjectIds(post.userId),
    groupId: serializeObjectIds(post.groupId),
    creator: post.creator ? {
      ...post.creator,
      _id: serializeObjectIds(post.creator._id)
    } : post.creator
  };
} 