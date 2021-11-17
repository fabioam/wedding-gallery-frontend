import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'

const GalleryState = rj({
    effectCaller: rj.configured(),
    effect: () => () =>
        ajax.getJSON(`/gallery/`),
})

export default function Gallery() {
    const [{ data: contacts }] = useRunRj(GalleryState, [], false)

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {contacts &&
            contacts.map((contact) => (
            <div className="col">
                <div className="card shadow-sm">
                    <img src={contact.image_thumb}
                    />
                </div>
            </div>
            ))}
        </div>
    )
}