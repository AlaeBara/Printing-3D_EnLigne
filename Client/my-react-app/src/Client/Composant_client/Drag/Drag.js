import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import "./Drag.css"
import ModelView from "../Model_view/Model";

const DragFile3D = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.stl',
    onDrop: acceptedFiles => {
      const filteredFiles = acceptedFiles.filter(file =>
        file.name.endsWith('.stl')
      );
      if (filteredFiles.length < acceptedFiles.length) {
        setError('Only .stl files are allowed');
      } else {
        setError('');
        setFile(Object.assign(filteredFiles[0], {
          preview: URL.createObjectURL(filteredFiles[0])
        }));
      }
    }
  });

  console.log('File:', file);

  return (
    <div className="drag-file-3d">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <FontAwesomeIcon icon={faCloudUploadAlt} className="icon" />
        <p className='drag_p'>Glisser-déposer un fichier ici, ou cliquez pour sélectionner un fichier</p>
        <br />
        <p className='drag_p'>Fichier pris en charge : .stl</p>
      </div>
      <aside>
        {file && <p className='drag_p filename'>{file.name}</p>}
      </aside>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {file && <ModelView file={file} />}
    </div>
  );
};

export default DragFile3D;
