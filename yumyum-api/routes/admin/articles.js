const express = require('express');
const router = express.Router();
const { Article } = require('../../models'); 

/**
 * Get /admin/articles
 * @description Get a list of articles
 */
router.get('/getList', async (req, res) => {
    const condition = {
      order: [['id', 'DESC']]
    }
  try {
    const articles = await Article.findAll(condition);
    res.json({
        status: 'true', 
        message: 'Articles retrieved successfully', 
        data: articles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to retrieve articles',
        errors: [error.message]
    });
  }
});

module.exports = router;