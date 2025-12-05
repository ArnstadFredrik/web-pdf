const EmbedPdf = ({ download }) => {
  return (
    <div className="content pdf_view">
      <embed
        width="100%"
        height="100%"
        src={download.url}
        type={download.type}
      />
    </div>
  );
};

export default EmbedPdf;
