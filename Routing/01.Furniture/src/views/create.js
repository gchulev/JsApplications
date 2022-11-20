import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { createItem } from '../data/data.js';

function createViewTemplate(validationObj = {}) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onCreate}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control ${validationObj.validMake}" id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control ${validationObj.validModel}" id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control ${validationObj.validYear}" id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control ${validationObj.validDescription}" id="new-description" type="text"
                        name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control ${validationObj.validPrice}" id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control ${validationObj.validImage}" id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>`;
}

let page = null;
let renderTemplate = null;



export function showCreateView(ctx) {
    page = ctx.page;
    renderTemplate = ctx.renderView;
    ctx.renderView(createViewTemplate({}));
}

function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Validation
    const { make, model, year, description, price, img } = data;

    const validationObj = {
        validMake: 'is-valid',
        validModel: 'is-valid',
        validYear: 'is-valid',
        validDescription: 'is-valid',
        validPrice: 'is-valid',
        validImage: 'is-valid'
    }

    if (!make || make.length < 4) {
        validationObj.validMake = 'is-invalid';
    } else {
        validationObj.validMake = 'is-valid';
    }

    if (!model || model < 4) {
        validationObj.validModel = 'is-invalid';
    } else {
        validationObj.validModel = 'is-valid';
    }

    if (!year || year < 1950 || year > 2050) {
        validationObj.validYear = 'is-invalid';
    } else {
        validationObj.validYear = 'is-valid';
    }

    if (!description || description.length <= 10) {
        validationObj.validDescription = 'is-invalid';
    } else {
        validationObj.validDescription = 'is-valid';
    }

    if (!price || price < 0) {
        validationObj.validPrice = 'is-invalid';
    } else {
        validationObj.validPrice = 'is-valid';
    }

    if (!img) {
        validationObj.validImage = 'is-invalid';
    } else {
        validationObj.validImage = 'is-valid';
    }

    const isValidForm = Object.values(validationObj).every(elm => elm === 'is-valid');

    if (!isValidForm) {
        return renderTemplate(createViewTemplate(validationObj));
    }

    createItem(data);
    //event.target.reset();

    page.redirect('/');
}