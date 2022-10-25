export const getFoodTitle = (
   brand_owner: string | null | undefined,
   description: string
) => {
   let brand_name_updated = '';
   let description_updated = '';
   let title = '';
   if (
      brand_owner !== null &&
      brand_owner !== '' &&
      brand_owner !== undefined
   ) {
      const brandNameArr = brand_owner.split(' ');
      for (let i = 0; i < brandNameArr.length; i++) {
         if (brandNameArr[i] !== '') {
            brandNameArr[i] =
               brandNameArr[i][0] + brandNameArr[i].slice(1).toLowerCase();
         }
      }
      brand_name_updated = brandNameArr.join(' ');
   }
   if (
      description !== null &&
      description !== undefined &&
      description !== ''
   ) {
      const descriptionArr = description.split(' ');
      for (let i = 0; i < descriptionArr.length; i++) {
         if (descriptionArr[i] !== '') {
            descriptionArr[i] =
               descriptionArr[i][0] + descriptionArr[i].slice(1).toLowerCase();
         }
      }
      description_updated = descriptionArr.join(' ');
   }
   if (brand_name_updated !== '') {
      title = `${description_updated} (${brand_name_updated})`;
   } else {
      title = description_updated;
   }
   return title;
};
