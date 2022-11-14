import type { TVehicleType } from '../../pages/api/interfaces'

export const getVehicleTypeDetail = (type: TVehicleType): { name: string; description: string } => {
  switch (type) {
    case 'Alcove':
      return {
        name: 'Přívěs',
        description: 'Tažný karavan za vaše auto. Od kapkovitých až po rodinné.'
      }
    case 'BuiltIn':
      return {
        name: 'Vestavba',
        description: 'Celý byt geniálně poskládaný do dodávky.'
      }
    case 'Campervan':
      return {
        name: 'Campervan',
        description: 'Obytka s rozměry osobáku, se kterou dojedete všude.'
      }
    case 'Intergrated':
      return {
        name: 'Integrál',
        description: 'Král mezi karavany. Luxus na kolech.'
      }
  }
}
