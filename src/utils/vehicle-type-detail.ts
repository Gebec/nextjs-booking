import type { TVehicleType } from '../../pages/api/interfaces'

export const vehicleTypeDetail: Record<TVehicleType, { name: string; description: string }> = {
  Alcove: {
    name: 'Přívěs',
    description: 'Tažný karavan za vaše auto. Od kapkovitých až po rodinné.'
  },
  BuiltIn: {
    name: 'Vestavba',
    description: 'Celý byt geniálně poskládaný do dodávky.'
  },
  Campervan: {
    name: 'Campervan',
    description: 'Obytka s rozměry osobáku, se kterou dojedete všude.'
  },
  Intergrated: {
    name: 'Integrál',
    description: 'Král mezi karavany. Luxus na kolech.'
  }
}

export const getVehicleTypeName = (type: TVehicleType): string => {
  switch (type) {
    case 'Alcove':
      return vehicleTypeDetail.Alcove.name
    case 'BuiltIn':
      return vehicleTypeDetail.BuiltIn.name
    case 'Campervan':
      return vehicleTypeDetail.Campervan.name
    case 'Intergrated':
      return vehicleTypeDetail.Intergrated.name
  }
}
