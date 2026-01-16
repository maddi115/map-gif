export default function RenderSleekComment(text) {
  if (!text) return '';
  
  // Using Shadcn-inspired styling: semi-bold, white, clean tracking
  return `
    <div style="
      color: #ffffff; 
      font-family: 'Inter', system-ui, -apple-system, sans-serif; 
      font-size: 14px; 
      font-weight: 500; 
      line-height: 1.4; 
      text-align: center; 
      margin-top: 8px;
      letter-spacing: -0.01em;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    ">
      ${text}
    </div>
  `;
}
