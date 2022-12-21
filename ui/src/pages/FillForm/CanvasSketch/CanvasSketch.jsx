import { useState, useRef } from 'react'

// LIBRARY
import { ReactSketchCanvas } from 'react-sketch-canvas'

// MUIS
import { alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import Stack from '@mui/material/Stack'

// MUI ICONS
import IconBorderColor from '@mui/icons-material/BorderColor'
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconDeleteOutline from '@mui/icons-material/DeleteOutline'
import IconDriveFileRenameOutline from '@mui/icons-material/DriveFileRenameOutline'
import IconEdit from '@mui/icons-material/Edit'
import IconEditOff from '@mui/icons-material/EditOff'
import IconUndo from '@mui/icons-material/Undo'
import IconPalette from '@mui/icons-material/Palette'
import IconRedo from '@mui/icons-material/Redo'

// STYLES
import useStyles from './canvasSketchUseStyles'
import { imageToBase64 } from '../fillFormConstants'

const CanvasSketch = (props) => {
  const { getResultCanvas } = props
  const classes = useStyles()
  const initColor = [
    {
      color: '#000000',
      text: 'black'
    }, {
      color: '#DA3630',
      text: 'red'
    }, {
      color: '#F2AE47',
      text: 'orange'
    }, {
      color: '#FFFE5E',
      text: 'yellow'
    }, {
      color: '#438631',
      text: 'green'
    }, {
      color: '#0C0EF2',
      text: 'blue'
    }, {
      color: '#FFFFFF',
      text: 'white'
    }]

  const canvasRef = useRef()

  // STATES
  const [strokeColor, setStrokeColor] = useState(initColor[0].color)
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [isEraseActive, setIsEraseActive] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState('')

  // HANDLE CANVAS IMAGE
  const handleCanvasImage = async (event) => {
    const image = await imageToBase64(event.target.files[0])
    setBackgroundImage(image)
  }

  // CONVERT CANVAS TO IMAGE
  const convertCanvasToImage = async () => {
    const result = await canvasRef.current?.exportImage('png')
    getResultCanvas(result)
  }

  return (
    <Stack className={classes.root}>
      <Stack className='no-zoom' maxWidth='484px' position='relative'>
        <Button
          className={classes.buttonSave}
          onClick={() => convertCanvasToImage()}
        >Save</Button>

        <ReactSketchCanvas
          className={classes.canvas}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          eraserWidth={strokeWidth}
          ref={canvasRef}
          backgroundImage={backgroundImage}
          exportWithBackgroundImage={backgroundImage ? true : false}
        />

        {/* CHOOSE COLOR */}
        {isDialogOpen === 'dialogColor' && (<SpeedDial
          ariaLabel='choose color'
          hidden={true}
          open={true}
          className={`${classes.speedDial} zoom`}
          direction='up'
        >
          {initColor && initColor.map((item, index) => (
            <SpeedDialAction
              key={index}
              sx={{
                backgroundColor: item.color,
                '&:hover': {
                  backgroundColor: alpha(item.color, 0.76)
                }
              }}
              title={item.text}
              onClick={() => setStrokeColor(item.color)}
            />
          ))}
        </SpeedDial>)}

        {/* CHOOSE STROKE */}
        {isDialogOpen === 'dialogStroke' && (<SpeedDial
          ariaLabel='choose stroke'
          hidden={true}
          open={true}
          className={`${classes.speedDial} zoom`}
          direction='up'
        >
          <SpeedDialAction
            title='regular'
            icon={<IconDriveFileRenameOutline />}
            onClick={() => setStrokeWidth(4)}
          />

          <SpeedDialAction
            title='bold'
            icon={<IconBorderColor />}
            onClick={() => setStrokeWidth(8)}
          />

          <SpeedDialAction
            title='eraser'
            icon={<IconEditOff />}
            onClick={() => {
              const modeOn = !isEraseActive
              setIsEraseActive(!modeOn)
              canvasRef.current?.eraseMode(modeOn)
            }}
          />
        </SpeedDial>)}

        {/* CANVAS TOOL */}
        <SpeedDial
          ariaLabel='canvas tool'
          hidden={true}
          open={true}
          className={`${classes.speedDial} canvasTool zoom`}
          direction='up'
        >
          <SpeedDialAction
            title='undo'
            icon={<IconUndo />}
            onClick={() => canvasRef.current.undo()}
          />

          <SpeedDialAction
            title='redo'
            icon={<IconRedo />}
            onClick={() => canvasRef.current.redo()}
          />

          <SpeedDialAction
            title='clear'
            icon={<IconDeleteOutline />}
            onClick={() => canvasRef.current.clearCanvas()}
          />
        </SpeedDial>
      </Stack>

      <Stack direction='row' alignItems='center' className={classes.listActionButton}>
        <Button
          size='small'
          className={`${classes.buttonRedPrimary} buttonColor`}
          startIcon={<IconPalette fontSize='small'/>}
          onClick={() => setIsDialogOpen(current => current === 'dialogColor' ? '' : 'dialogColor')}
        >
          Select Color
        </Button>

        <Button
          size='small'
          className={`${classes.buttonRedPrimary} buttonStroke`}
          startIcon={<IconEdit fontSize='small'/>}
          onClick={() => setIsDialogOpen(current => current === 'dialogStroke' ? '' : 'dialogStroke')}
        >
          Select Stroke
        </Button>

        <Button
          size='small'
          className={`${classes.buttonRedPrimary} buttonAddImage`}
          startIcon={<IconCameraAlt fontSize='small'/>}
          component='label'
        >
          Add Image
          <input
            hidden
            accept='image/png,image/jpeg'
            type='file'
            onChange={(event) => handleCanvasImage(event)}
          />
        </Button>
      </Stack>
    </Stack>
  )
}

export default CanvasSketch