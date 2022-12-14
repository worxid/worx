export const updateMetaData = (inputMetaData) => {
  document.title = inputMetaData?.title ?? 'Worx'
  document.getElementsByTagName('meta')['description'].content = inputMetaData?.description ?? 'Worx is an open source mobile forms & data collection tool for every industry needs. Simply drag & drop forms with rich formats and distribute to all teams.'
}