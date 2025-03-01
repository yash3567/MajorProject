
import './about.css';
import { FiExternalLink } from 'react-icons/fi';

const FlipCard = (props) => {
  // Check if connect is provided and not undefined
  const formattedLink = props.connect
    ? props.connect.startsWith('http')
      ? props.connect
      : `https://${props.connect}`
    : null; // Handle cases where connect is undefined

  return (
    <div className="card h-40 w-80 md:w-52">
      <div className="card-inner">
        <div className="card-front flex items-center justify-center text-2xl font-medium">
          <p>{props.name}</p>
        </div>
        <div className="card-back text-black flex flex-col items-center justify-center">
          <strong>{props.position}</strong>
          <p>{props.contribution}</p>
          {formattedLink ? (
            <a
              className='flex items-center gap-1'
              href={formattedLink}
              target='_blank'
              rel="noreferrer"
            >
              Connect <FiExternalLink />
            </a>
          ) : (
            <p>No link available</p> // Fallback message if connect is missing
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
