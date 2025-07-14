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

/**
 * GET /admin/articles/:id
 * @description Get a specific article by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: 'Article not found',
        errors: [`No article found with ID ${id}`]
      });
    }

    res.json({
      status: 'true', 
      message: 'Article retrieved successfully', 
      data: article
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to retrieve article',
        errors: [error.message]
    });
  }
});


module.exports = router;