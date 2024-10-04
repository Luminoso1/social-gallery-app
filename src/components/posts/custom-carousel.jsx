import { format } from 'date-fns'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

export default function CustomCarousel({ selected, setSelected }) {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        // verify if the dialog is open to execute the function setSelected
        if (isOpen) {
          setSelected()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant='link'
          onClick={setSelected}
          className='text-white/70 cursor-pointer p-1'
        >
          <svg
            className='size-5 md:size-6'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5'
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 overflow-hidden border-none px-2'>
        <Carousel className='p-0 gap-0'>
          <CarouselContent className='p-0 gap-0'>
            {selected?.photos?.map(
              (
                { photoUrl, title, date, country, city, description },
                index
              ) => (
                <CarouselItem key={index} className='pl-2'>
                  <section className='max-w-6xl mx-auto'>
                    <img src={photoUrl} alt={'photo alt'} className='' />
                    <div className='my-10 px-10'>
                      <h2 className='text-2xl'>{title}</h2>
                      <h3 className='text-slate-500'>
                        {date ? format(date, 'PP') : ''}
                      </h3>
                      <h3>
                        {country} - {city}
                      </h3>
                      <p>{description}</p>
                    </div>
                  </section>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}
