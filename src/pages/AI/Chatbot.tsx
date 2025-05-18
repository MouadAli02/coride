const Chatbot = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <iframe
        src={process.env.VITE_STREAMLIT_URL || "http://localhost:8501"}
        width="100%"
        height="100%"
        style={{
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        title="Streamlit Chatbot"
      />
    </div>
  );
};

export default Chatbot;