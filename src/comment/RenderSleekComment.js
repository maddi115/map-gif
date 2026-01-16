export default function RenderSleekComment(text) {
  if (!text) return '';

  return `
    <div style="
      color: #ffffff;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      margin-top: 4px;
      letter-spacing: -0.01em;
      text-shadow: 0 2px 4px rgba(0,0,0,0.9);
      background: rgba(0,0,0,0.7);
      padding: 4px 8px;
      border-radius: 4px;
      max-width: 80px;
      word-wrap: break-word;
    ">
      ${text}
    </div>
  `;
}
