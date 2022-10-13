export default function handler(req, res) {
  let url = '/'
  const { slug } = req.query
  if (slug) url = `/${slug}`
  res.setPreviewData({})
  res.redirect(url)
}
