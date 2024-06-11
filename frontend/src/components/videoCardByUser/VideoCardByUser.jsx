import PropTypes from "prop-types";
import "./VideoCardByUser.css";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const VideoCardByUser = ({ item }) => {
  const { id, title, thumbnail, views, duration } = item;
  const navigate = useNavigate()

  return (
    <div className="card-width-user card-border">
      <div className="position-relative cursor-pointer" onClick={() => navigate(`/watch-video/${id}`)}>
        {/* <video src=""></video> */}
        <img src={thumbnail} className="card-img-top card-img" alt={`Imagen ${item.title}`} />
        <span className="position-absolute end-0 bottom-0 z-3 text-white text-center rounded-1 px-1 m-2 span-duration">{duration}</span>
      </div>
      <div className="pb-0 pt-2 ps-1">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="m-0 pe-2 text-start text-ellipsis" title={title}>{title}</h6>
          <Dropdown> {/* as="div" para poder personalizar */}
            <Dropdown.Toggle as="div" variant="secondary" id="dropdown-custom" className="custom-dropdown-toggle">
              <i className="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0 menu-options' style={{ minWidth: '100px' }}>
              <Dropdown.Item className='option rounded-top user-select-none'><i className="bi bi-pencil-square me-2 text-primary"></i> Editar</Dropdown.Item>
              <Dropdown.Item className='option user-select-none'><i className="bi bi-trash3-fill me-2 text-danger"></i> Eliminar</Dropdown.Item>
              <Dropdown.Item className='option user-select-none'><i className="bi bi-download me-2 text-green"></i> Descargar</Dropdown.Item>
              <Dropdown.Item className='option rounded-bottom user-select-none'><i className="bi bi-share-fill me-2 text-info"></i> Compartir</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-gray"><i className="text-green bi bi-eye"></i> {views} Vistas <span className="fw-bold">·</span> hace 2 horas</p>
        </div>
      </div>
    </div>
  );
};

VideoCardByUser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    // video: PropTypes.string.isRequired,
    // comments: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    // likes: PropTypes.number.isRequired,
    // dislikes: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardByUser;
