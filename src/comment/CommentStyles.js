export default function CommentStyles(text) {
  if (!text) return '';

  return `
    <div style="
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
      background: #ffffff;
      padding: 8px 14px;
      border-radius: 18px;
      max-width: 120px;
      word-wrap: break-word;
      line-height: 1.3;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    ">
      ${text}
      <div style="
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #ffffff;
      "></div>
    </div>
  `;
}
