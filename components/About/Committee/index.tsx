import committee from '@data/committee.json'
import CommitteeCard from './CommitteeCard'

const Committee = () => (
  <div className='grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]'>
    {committee.map(member => (
      <CommitteeCard key={member.name} {...member} />
    ))}
  </div>
)

export default Committee
