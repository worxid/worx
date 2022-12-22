import { useState, useRef, useEffect } from 'react'

// CONSTANTS
import { imageToBase64 } from '../fillFormConstants'

// LIBRARY
import { ReactSketchCanvas } from 'react-sketch-canvas'

// MUIS
import { alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
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

const CanvasSketch = (props) => {
  const { fieldId, getResultCanvas, isOnMediumLargeScreen } = props
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
    const image = await imageToBase64(event.target.files[event.target.files.length-1])
    setBackgroundImage(image)
  }

  // CONVERT CANVAS TO IMAGE
  const convertCanvasToImage = async () => {
    const result = await canvasRef.current?.exportImage('png')
    getResultCanvas(result)
  }

  useEffect(() => {
    canvasRef.current?.eraseMode(isEraseActive)
  }, [isEraseActive])

  return (
    <Stack className={classes.root}>
      <Stack className='no-zoom' maxWidth='484px' height='278px' position='relative'>
        <Button
          className={classes.buttonSave}
          onClick={() => convertCanvasToImage()}
        >Save</Button>

        <ReactSketchCanvas
          className={classes.canvas}
          id={fieldId}
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
          className={classes.speedDial}
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
              tooltipPlacement='right'
            />
          ))}
        </SpeedDial>)}

        {/* CHOOSE STROKE */}
        {isDialogOpen === 'dialogStroke' && (<SpeedDial
          ariaLabel='choose stroke'
          hidden={true}
          open={true}
          className={classes.speedDial}
          direction='up'
        >
          <SpeedDialAction
            title='regular'
            icon={<IconDriveFileRenameOutline />}
            onClick={() => setStrokeWidth(4)}
            tooltipPlacement='right'
          />

          <SpeedDialAction
            title='bold'
            icon={<IconBorderColor />}
            onClick={() => setStrokeWidth(8)}
            tooltipPlacement='right'
          />

          <SpeedDialAction
            title='eraser'
            icon={<IconEditOff />}
            onClick={() => {
              setIsEraseActive(!isEraseActive)
            }}
            tooltipPlacement='right'
          />
        </SpeedDial>)}

        {/* CANVAS TOOL */}
        <SpeedDial
          ariaLabel='canvas tool'
          hidden={true}
          open={true}
          className={`${classes.speedDial} canvasTool`}
          direction='up'
        >
          <SpeedDialAction
            title='undo'
            icon={<IconUndo />}
            onClick={() => canvasRef.current.undo()}
            tooltipPlacement='right'
          />

          <SpeedDialAction
            title='redo'
            icon={<IconRedo />}
            onClick={() => canvasRef.current.redo()}
            tooltipPlacement='right'
          />

          <SpeedDialAction
            title='clear'
            icon={<IconDeleteOutline />}
            onClick={() => canvasRef.current.clearCanvas()}
            tooltipPlacement='right'
          />
        </SpeedDial>
      </Stack>

      <Stack direction='row' alignItems='center' className={classes.listActionButton}>
        <IconButton
          size='small'
          className={`${classes.buttonRedPrimary} buttonColor`}
          onClick={() => setIsDialogOpen(current => current === 'dialogColor' ? '' : 'dialogColor')}
        >
          <IconPalette fontSize='small'/>{isOnMediumLargeScreen() && ' Select Color'}
        </IconButton>

        <IconButton
          size='small'
          className={`${classes.buttonRedPrimary} buttonStroke`}
          onClick={() => setIsDialogOpen(current => current === 'dialogStroke' ? '' : 'dialogStroke')}
        >
          <IconEdit fontSize='small'/>{isOnMediumLargeScreen() && ' Select Stroke'}
        </IconButton>

        <IconButton
          size='small'
          className={`${classes.buttonRedPrimary} buttonAddImage`}
          component='label'
        >
          <IconCameraAlt fontSize='small'/>{isOnMediumLargeScreen() && ' Add Image'}
          <input
            hidden
            accept='image/png,image/jpeg'
            type='file'
            onChange={(event) => handleCanvasImage(event)}
          />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default CanvasSketch