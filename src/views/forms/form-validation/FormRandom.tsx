// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Import

// ** Third Party Imports
// import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports

// ** Types
import { Box } from '@mui/system'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Button, Tooltip, Typography } from '@mui/material'
import NProgress from 'nprogress'
import React from 'react'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import { BusAiChip } from 'src/@core/components/chip/BusAiChip'
import StepBar from 'src/@core/components/steper/StepBar'
import { Icon } from '@iconify/react'
import API from 'src/api'
import { useAuth } from 'src/hooks/useAuth'


// interface FormInputs {
//   prompt: string
// }

// const defaultValues = {
//   prompt: '',
// }

interface Props {
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setShow?: Dispatch<SetStateAction<boolean>>,
  setUrlImg: Dispatch<SetStateAction<string | null>>,
  setImageId: Dispatch<SetStateAction<string | null>>
}


const listPrompt = [
  {
    type: 'Hat',
    chips: [
      "No hat",
      "Pink fluffy hat",
      "Pirate hat with a parrot",
      "Top hat with a flower",
      "Rainbow-striped beanie",
      "Wizard's hat with stars",
      "Cowboy hat with LED lights",
      "Viking helmet with horns",
      "Giant sombrero",
      "Fedora with a feather",
      "Chef's hat with a spoon",
      "Cap with propeller",
      "Hat with cat ears",
      "Disco ball helmet",
      "Dragon head hat",
      "Knight's helmet",
      "Space helmet with antenna",
      "Sun hat with a ribbon",
      "Fedora with skull and crossbones",
      "Baseball cap with a comic bubble",
      "Detective's deerstalker",
      "Jester's hat with bells",
      "Party hat with confetti",
      "Tricorn hat with gold trim",
      "Aviator cap with goggles",
      "Bunny ear hat",
      "Shark hat with teeth",
      "Flower pot hat",
      "Mushroom cap hat",
      "Elf hat with bells",
      "Crown with jewels",
      "Hat with googly eyes",
      "Construction helmet with stickers",
      "Santa hat with pompom",
      "Bowler hat with a mustache",
      "Straw hat with daisies",
      "Knight's helmet with a plume",
      "Graduation cap with tassel",
      "Beret with a paintbrush",
      "Beehive hat with bees"
    ]
  },
  {
    type: 'Shoes',
    chips: [
      "Rainbow sneakers",
      "High heels with glitter",
      "Clown shoes",
      "Cowboy boots with spurs",
      "Sneakers with neon lights",
      "Sandals with seashells",
      "Roller skates with rainbow wheels",
      "Bunny slippers",
      "Combat boots with chains",
      "Winged sandals",
      "Platform shoes with flowers",
      "Tap shoes with bows",
      "Space boots with moon dust",
      "Crocs with charms",
      "Moccasins with fringe",
      "Slippers shaped like dinosaurs",
      "Hiking boots with laces",
      "Ballet flats with ribbons",
      "Loafers with tassels",
      "Jelly shoes with sparkles",
      "Soccer cleats with studs",
      "Duck shoes with bills",
      "Ice skates with glitter",
      "Mermaid tail shoes",
      "Wizard shoes with curls",
      "Elf shoes with bells",
      "Dragon claw shoes",
      "Pirate boots with buckles",
      "Rollerblades with lights",
      "Water shoes with fins",
      "Ankle boots with zippers",
      "Snow boots with fur",
      "Clogs with painted designs",
      "Sneakers with wings",
      "Fishnet stockings with heels",
      "Moon shoes with springs",
      "Leather sandals with beads",
      "Velcro shoes with patches",
      "Denim sneakers",
      "Fairy shoes with sparkle dust"
    ]
  }
  ,
  {
    type: 'Clothes',
    chips: [
      "Cowboy outfit",
      "Unicorn pajamas",
      "White shirt with black shorts",
      "Pirate costume with eyepatch",
      "Space suit with helmet",
      "Ninja outfit with mask",
      "Fairy dress with wings",
      "Superhero costume with cape",
      "Tuxedo with bow tie",
      "Mermaid outfit with scales",
      "Astronaut suit",
      "Rainbow-striped dress",
      "Wizard robe with stars",
      "Clown suit with polka dots",
      "Samurai armor",
      "Disco outfit with sequins",
      "Chef uniform with apron",
      "Knight's armor",
      "Vampire cape with collar",
      "Steampunk outfit with goggles",
      "Ballerina tutu",
      "Hula skirt with flowers",
      "Hawaiian shirt with palm trees",
      "Rock star leather jacket",
      "Detective trench coat",
      "Gladiator outfit with sandals",
      "Princess gown with tiara",
      "Scientist lab coat",
      "Sports jersey",  // Notice "with number" is removed
      "Camouflage outfit",
      "Sailor uniform",
      "Medieval jester costume",
      "Victorian-era dress",
      "Elf costume with tunic",
      "Jungle explorer outfit",
      "Gothic outfit with lace",
      "Beachwear with surfboard",
      "Royal guard uniform",
      "Futuristic bodysuit",
      "Circus ringmaster outfit"
    ]
  },
  {
    type: 'Emotion',
    chips: [
      "Dizzy face",
      "Silly face",
      "Close one eye and blink",
      "Bandage on nose",
      "Big toothy grin",
      "Angry with steam from ears",
      "Tears of joy",
      "Heart eyes",
      "Shocked with wide eyes",
      "Blushing cheeks",
      "Laughing with tears",
      "Pouting lips",
      "Winking with a smirk",
      "Tongue sticking out",
      "Sad with a single tear",
      "Confused with a tilted head",
      "Sleepy with droopy eyes",
      "Mischievous grin",
      "Crying loudly",
      "Surprised with raised eyebrows",
      "Yawning with a big mouth",
      "Determined with clenched jaw",
      "Nervous with sweat drops",
      "Excited with starry eyes",
      "Annoyed with a furrowed brow",
      "Smug with a raised eyebrow",
      "Cheeky with a tongue out",
      "Embarrassed with flushed face",
      "Curious with wide eyes",
      "Sly with narrowed eyes",
      "Sick with a thermometer",
      "Tired with bags under eyes",
      "Proud with a puffed chest",
      "In love with floating hearts",
      "Scared with wide-open mouth",
      "Shocked with dropped jaw",
      "Bored with half-closed eyes",
      "Playful with a wink and tongue out",
      "Frowning with downturned lips",
      "Giggling with a hand over mouth",

      "Dizzy face",
      "Silly face",
      "Close one eye and blink",
      "Bandage on nose",
      "Big toothy grin",
      "Angry with steam from ears",
      "Tears of joy",
      "Heart eyes",
      "Shocked with wide eyes",
      "Blushing cheeks",
      "Laughing with tears",
      "Pouting lips",
      "Winking with a smirk",
      "Tongue sticking out",
      "Sad with a single tear",
      "Confused with a tilted head",
      "Sleepy with droopy eyes",
      "Mischievous grin",
      "Crying loudly",
      "Surprised with raised eyebrows",
      "Yawning with a big mouth",
      "Determined with clenched jaw",
      "Nervous with sweat drops",
      "Excited with starry eyes",
      "Annoyed with a furrowed brow",
      "Smug with a raised eyebrow",
      "Cheeky with a tongue out",
      "Embarrassed with flushed face",
      "Curious with wide eyes",
      "Sly with narrowed eyes",
      "Sick with a thermometer",
      "Tired with bags under eyes",
      "Proud with a puffed chest",
      "In love with floating hearts",
      "Scared with wide-open mouth",
      "Shocked with dropped jaw",
      "Bored with half-closed eyes",
      "Playful with a wink and tongue out",
      "Frowning with downturned lips",
      "Giggling with a hand over mouth",
      "Confident with a chin up",
      "Daydreaming with a dreamy look",
      "Sobbing with streams of tears",
      "Grumpy with a scowl",
      "Hungry with licking lips",
      "Singing with musical notes",
      "Thinking with a hand on chin",
      "Surprised with a gasp",
      "Jealous with green eyes",
      "Angry with a red face",
      "Satisfied with a content smile",
      "Relieved with a sigh",
      "Stressed with a worried look",
      "Awestruck with open mouth",
      "Amused with a chuckle",
      "Guilty with shifty eyes",
      "Disappointed with a sigh",
      "Furious with clenched fists",
      "Elated with a wide smile",
      "Bashful with a shy smile",
      "Eyes bulging out in sheer astonishment",
      "Sweating and tired",
      "Lips pursed tightly in annoyance",
      "Face turn to red and the tounge out",
      "Jaw dropping in utter disbelief",
      "Eyebrows shooting up in sudden realization",
      "Mouth agape, speechless with shock",
      "Fists clenched in fury, knuckles turning white",
      "Forehead furrowed in deep concentration",
      "Shoulders hunched, shrinking in shame",
      "Chin trembling with suppressed emotion",
      "Nervous gaze flickering",
      "Nostrils flaring in anger",
      "Lips trembling and cold face",
      "Squinting eyes in suspicion",
      "Throat tight with tears",
      "Wear round glasses",
      "Long breath with sad face",
      "Wear earrings",
      "Wear white mask"
    ]
  }
  , {
    type: 'Pose',
    chips: [
      "Feet planted, hands in pockets",
      "Deep squat, one hand touches ground, other reaches for sky",
      "Feet apart, one hand on hip, other gesturing",
      "One foot lifted, arms extended for balance",
      "Squatting with one hand on ground, other stretched out behind",
      "Legs crossed, arms crossed, leaning slightly",
      "Standing on tip-toes, arms stretched up",
      "Squatting low, arms wrapped around knees",
      "Feet wide, one hand up, fingers snapping",
      "Jumping with arms raised high",
      "Squatting with both hands on ground, legs bent",
      "Wide-legged stance, fists clenched",
      "Standing on one leg, other leg lifted and bent",
      "Squatting with one arm reaching low to the ground",
      "Hip-hop stance with feet apart, one arm swinging",
      "Standing on one leg, arms open wide",
      "Deep squat with one arm sliding across the floor",
      "Wide-legged stance, one hand pointing forward",
      "Balanced on one leg, other leg extended back, arms swirling",
      "Deep squat with arms reaching up and back",
      "Casual stance with one hand on chin, pondering",
      "Standing on one leg, leaning to the side, other leg lifted",
      "Deep squat with one arm sweeping across the body",
      "Feet apart, one arm raised with fingers snapping",
      "Standing on one leg, bouncing lightly",
      "Deep squat with arms swaying side to side",
      "Hip-hop stance with one foot sliding forward",
      "Jumping with legs tucked in, arms crossed",
      "Squatting with one arm reaching forward, as if diving",
      "Standing with knees slightly bent, bouncing rhythmically",
      "Deep squat with one arm twisted behind",
      "Jumping with legs spread, arms gesturing",
      "Deep squat with arms spread out, spinning",
      "Hip-hop stance with one foot forward, one hand on hip",
      "Squatting with one arm on ground, other arm reaching up",
      "Jumping with arms reaching for the sky",
      "Standing on one leg, tapping foot to the rhythm",
      "Deep squat with arms swinging side to side",
      "Hip-hop stance with one foot rising off the ground",
      "Standing on one leg, arms raised high, eyes closed in bliss"
    ]
  }
]




const FormRandom = ({ setIsLoading, isLoading, setShow, setUrlImg, setImageId }: Props) => {

  const [listChip, setListChip] = useState<any[]>([])
  const [showRemove, setShowRemove] = useState<boolean>(true)
  const {user} = useAuth()

  useEffect(() => {
    randomChip()
  }, []);

  const genPrompt = () => {
    let resultString = "";
    for (const obj of listChip) {
      resultString += `${obj.type}: ${obj.chips[0]}.`;
    }

    return resultString
  }

  const removeChip = (index: number) => {
    const newListCip = [...listChip];
    newListCip[index].chips = []
    console.log(newListCip)
    setListChip(newListCip)
  }

  const randomChip = () => {
    const newListCip = JSON.parse(JSON.stringify(listPrompt));
    for (let i = 0; i < newListCip.length; i++) {
      const randomIndex = Math.floor(Math.random() * newListCip[i].chips.length);
      newListCip[i].chips = [newListCip[i].chips[randomIndex]]
      console.log(listPrompt)
    }
    setListChip(newListCip)
  }

  const onSubmit = async () => {
    NProgress.start()
    setIsLoading(true)
    await fetchData(genPrompt())
    NProgress.done()
    setIsLoading(false)
    if (setShow) setShow(true)
  }
  const [currentStep, setCurrentStep] = useState<number>(1)
  useEffect(() => {
    setShowRemove(currentStep < 2)
  }, [currentStep]);


  const fetchData = async (prompt: string) => {
    try {

      const response = await API.textToImage(prompt);
      setUrlImg(API.getUrlImage(response?.data?.data?.task_result?.resized_url))
      console.log(response?.data?.data)
      setImageId(response?.data?.data?.task_result?.id)
      toast.success('Generate done')

      return response.data
    } catch (error: any) {
      toast.error(error?.response.data.message)
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box>
        <Typography variant="body1" sx={{}}>
          Creating Busai memes is easy and full of surprise with ideas you’ve never thought of with the random generate meme feature.
        </Typography>
      </Box>
      <Box>
        <StepBar currentStep={currentStep} totalSteps={2} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {listChip.map((item, index) => (

          <Box key={index} sx={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
            <Box>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  width: '80px',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: '25.6px',
                  wordWrap: 'break-word',
                }}
              >
                {item.type}
              </Typography>
            </Box>
            <Box>
              <Grid container gap={'1rem'}>
                {item.chips[0] && <BusAiChip label={item.chips[0]} showRemove={showRemove} remove={() => removeChip(index)} />}
              </Grid>
            </Box>
          </Box>
        ))}

      </Box>
      <form>
        <Grid container gap={10}>
          <Grid item xs={12} container justifyContent="flex-start" >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Typography variant="body1">
                Generated {user?.checkProfile?.taskOfDay}/{user?.checkProfile?.config?.maxTaskPerDay}
                </Typography>
                <Tooltip placement='top' title={
                  <React.Fragment>
                    <Typography color="inherit">Generated</Typography>
                  </React.Fragment>
                }>
                  <Icon icon='tabler:info-circle' fontSize={20} />
                </Tooltip>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-start" >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              {currentStep === 1 && <Button variant='outlined' sx={{ borderRadius: 40 }} onClick={randomChip}>
                Random
              </Button>}
              {currentStep === 2 && <Button onClick={() => setCurrentStep(1)} variant='outlined' sx={{ borderRadius: 40 }}>
                Previous
              </Button>}
              {currentStep === 1 && <BusAiButton onClick={() => setCurrentStep(2)} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} variant='contained'>
                Next
              </BusAiButton>}
              {currentStep === 2 && <BusAiButton disabled={isLoading} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} onClick={onSubmit} variant='contained'>
                Generate
              </BusAiButton>}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormRandom
