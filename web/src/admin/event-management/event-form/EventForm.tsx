import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField } from '../../../components/form/select-field/SelectField';
import { TextAreaField } from '../../../components/form/text-area-field/TextAreaField';
import { TextField } from '../../../components/form/text-field/TextField';
import { useUserContext } from '../../../context/userContext';
import { EventLocation, EventLocationPermission, Party } from '../../../model/app';
import { filterPermissionsByRoles } from '../../../services/party.service';

interface PartyFormData extends Party {
  locationId: string;
}

type Props = {
  party?: Party;
  eventLocations: EventLocationPermission[];
  isLoading: boolean;
  onPartySubmit: (data: Party) => void;
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
  const { state: user } = useUserContext();

  const onHandleSubmit = async (data: PartyFormData) => {
    data.location = props.eventLocations.find((x) => x.id === data.locationId) ?? ({} as EventLocation);
    props.onPartySubmit(data);
  };

  return (
    <div className="admin-form-container">
      <p className="text-primary fs-2">{t('create_edit_party')}</p>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))} className="admin-form">
        <TextField
          label={t('event_name') + ' *'}
          name="eventName"
          register={register('eventName', { required: t('field_required') })}
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
          label={t('start_datetime') + ' *'}
          name="startDateTime"
          register={register('startDateTime', { required: t('field_required') })}
          type="datetime-local"
          errors={errors}
        />
        <TextField
          label={t('end_datetime') + ' *'}
          name="endDateTime"
          register={register('endDateTime', { required: t('field_required') })}
          type="datetime-local"
          errors={errors}
        />
        <TextField label={t('price')} name="price" register={register('price')} type="number" errors={errors} />
        <TextAreaField label={t('artists')} name="artits" register={register('artists')} errors={errors} />
        <SelectField
          label={t('event_location') + ' *'}
          name="locationId"
          register={register('locationId', { required: t('field_required') })}
          multiple={false}
          errors={errors}
          options={filterPermissionsByRoles(user?.roles, props.eventLocations).map((x) => {
            return { key: x.id, displayText: x.locationName };
          })}
        />
        <button className="btn btn-primary" type="submit" disabled={props.isLoading}>
          {props.isLoading ? 'loading' : t('save')}
        </button>
      </form>
    </div>
  );
};
