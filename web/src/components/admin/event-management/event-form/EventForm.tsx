import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { EventLocation, Party } from '../../../../model/app';
import { add, update } from '../../../../services/firebase-party.service';
import { SelectField } from '../../../form/select-field/SelectField';
import { TextField } from '../../../form/text-field/TextField';
import { TextAreaField } from '../../../form/text-area-field/TextAreaField';

interface PartyFormData extends Party {
  locationId: string;
}

type Props = {
  party?: Party;
  eventLocations: EventLocation[];
  onPartySubmit: () => void;
};

export const EventForm = (props: Props) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PartyFormData>({
    defaultValues: props.party,
  });

  const onHandleSubmit = async (data: PartyFormData) => {
    data.location = props.eventLocations.find((x) => x.id === data.locationId) ?? ({} as EventLocation);
    if (data.id) {
      await update(data);
    } else {
      await add(data);
    }
    props.onPartySubmit();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <p className="text-primary fs-2">{t('create_edit_party')}</p>
      <form
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <TextField label={t('id')} name="id" register={register('id')} type="text" errors={errors} disabled />
        <TextField
          label={t('event_name')}
          name="eventName"
          register={register('eventName')}
          type="text"
          errors={errors}
        />
        <TextField
          label={t('description')}
          name="description"
          register={register('description')}
          type="text"
          errors={errors}
        />
        <TextField
          label={t('music_genre')}
          name="musicGenre"
          register={register('musicGenre')}
          type="text"
          errors={errors}
        />
        <TextField
          label={t('start_datetime')}
          name="startDateTime"
          register={register('startDateTime')}
          type="datetime-local"
          errors={errors}
        />
        <TextField
          label={t('end_datetime')}
          name="endDateTime"
          register={register('endDateTime')}
          type="datetime-local"
          errors={errors}
        />
        <TextField label={t('price')} name="price" register={register('price')} type="number" errors={errors} />
        <TextAreaField label={t('artists')} name="artits" register={register('artists')} errors={errors} />
        <SelectField
          label={t('event_location')}
          name="locationId"
          register={register('locationId')}
          multiple={false}
          errors={errors}
          options={props.eventLocations.map((x) => {
            return { key: x.id, displayText: x.locationName };
          })}
        />
        <button className="btn btn-primary" type="submit">
          {t('save')}
        </button>
      </form>
    </div>
  );
};
