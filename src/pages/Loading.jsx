// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const Loading = ({ children }) => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     const timeout = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timeout);
//   }, [location.pathname]);

//   if (loading) {
//     return (
//       <>
//         {/* Inject keyframes for SVG animation */}
//         <style>{`
//           @keyframes rotate {
//             100% { transform: rotate(360deg); }
//           }
//           @keyframes dash {
//             0% {
//               stroke-dasharray: 1, 150;
//               stroke-dashoffset: 0;
//             }
//             50% {
//               stroke-dasharray: 90, 150;
//               stroke-dashoffset: -35;
//             }
//             100% {
//               stroke-dasharray: 90, 150;
//               stroke-dashoffset: -124;
//             }
//           }
//           .spinner {
//             animation: rotate 2s linear infinite;
//             transform-origin: center;
//           }
//           .path {
//             stroke: #09f;
//             stroke-linecap: round;
//             animation: dash 1.5s ease-in-out infinite;
//           }
//           .loading-text {
//             margin-top: 15px;
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             color: #09f;
//             font-weight: 600;
//             font-size: 1.25rem;
//             user-select: none;
//           }
//         `}</style>

//         <div style={styles.container} role="alert" aria-live="assertive" aria-busy="true">
//           <svg
//             className="spinner"
//             width="64"
//             height="64"
//             viewBox="0 0 50 50"
//             aria-hidden="true"
//           >
//             <circle
//               className="path"
//               cx="25"
//               cy="25"
//               r="20"
//               fill="none"
//               strokeWidth="4"
//             />
//           </svg>
//           <div className="loading-text">Loading...</div>
//         </div>
//       </>
//     );
//   }

//   return children;
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f4ff',
//   },
// };

// export default Loading;
























import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loading = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) {
    return (
      <>
        <style>{`
          @keyframes rotate {
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { fill-opacity: 1; }
            50% { fill-opacity: 0.6; }
          }
          .spinner {
            animation: rotate 3s linear infinite;
            transform-origin: center;
            width: 120px;
            height: 120px;
            display: block;
            margin: 0 auto;
          }
          .letter {
            fill: url(#pinkGradient);
            animation: pulse 2s ease-in-out infinite;
            transform-origin: center;
          }
          .letter.A {
            animation-delay: 0s;
          }
          .letter.G {
            animation-delay: 0.3s;
          }
          .letter.X {
            animation-delay: 0.6s;
          }
          .loading-text {
            margin-top: 30px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #D6336C; /* Pinkish */
            font-weight: 800;
            font-size: 1.75rem;
            letter-spacing: 0.1em;
            user-select: none;
            text-align: center;
          }
          body {
            background: #fff0f6; /* very light pink */
          }
        `}</style>

        <main
          style={styles.container}
          role="alert"
          aria-live="assertive"
          aria-busy="true"
          aria-label="Loading content, please wait"
        >
          <svg
            className="spinner"
            viewBox="0 0 120 40"
            aria-hidden="true"
            role="img"
          >
            <defs>
              <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D6336C" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
            </defs>
            {/* AGX Letters */}
            <text
              x="10"
              y="32"
              fontSize="32"
              fontWeight="bold"
              className="letter A"
              style={{ transformOrigin: "20px 20px" }}
            >
              A
            </text>
            <text
              x="50"
              y="32"
              fontSize="32"
              fontWeight="bold"
              className="letter G"
              style={{ transformOrigin: "60px 20px" }}
            >
              G
            </text>
            <text
              x="90"
              y="32"
              fontSize="42"
              fontWeight="bold"
              className="letter X"
              style={{ transformOrigin: "100px 20px" }}
            >
              X
            </text>
          </svg>
          <div className="loading-text">Loading AGX International...</div>
        </main>
      </>
    );
  }

  return children;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff0f6",
  },
};

export default Loading;
