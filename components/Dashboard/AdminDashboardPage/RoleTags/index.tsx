import { Role } from '@helpers/global'

const RoleTags = ({ role }: RoleProps) => {
  let roleClass: string

  switch (role.toLowerCase()) {
    case 'president':
      roleClass = 'bg-success text-secondary'
      break
    case 'vice_president':
      roleClass = 'bg-success/80 text-secondary'
      break
    case 'secretary':
      roleClass = 'bg-success/60'
      break
    case 'treasurer':
      roleClass = 'bg-success/40'
      break
    case 'tech_lead':
      roleClass = 'bg-accent text-primary'
      break
    case 'marketing_officer':
      roleClass = 'bg-accent/80 text-primary'
      break
    case 'ocm':
      roleClass = 'bg-accent/60'
      break
    case 'first_year_rep':
      roleClass = 'bg-accent/40'
      break
    case 'admin':
      roleClass = 'bg-warning text-primary'
      break
    case 'hlm':
      roleClass = 'bg-warning/60'
      break

    default:
      roleClass = 'bg-primary text-secondary dark:border-secondary/30'
      break
  }

  return (
    <div
      className={[
        'py-1 px-2 text-sm capitalize max-w-max font-mono border border-transparent',
        roleClass
      ]
        .join(' ')
        .trim()}
    >
      {role.split('_').join(' ')}
    </div>
  )
}

interface RoleProps {
  role: Role
}

export default RoleTags
