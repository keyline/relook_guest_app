import { Network } from "./Network"

export default class Apis {

    static app_setting = (data) => {
        return Network('post', 'get-app-setting', data)
    }

    static home_screen = (data) => {
        return Network('post', 'get-home-screen', data)
    }

    static sign_up = (data) => {
        return Network('post', 'signup', data)
    }

    static forgot_password = (data) => {
        return Network('post', 'forgot-password', data)
    }

    static otp_validate = (data) => {
        return Network('post', 'validate-otp', data)
    }

    static otp_validate_new = (data) => {
        return Network('post', 'validate-signup-otp', data)
    }

    static save_userdetails = (data) => {
        return Network('post', 'save-user-details', data)
    }

    static reset_password = (data) => {
        return Network('post', 'reset-password', data)
    }

    static sign_in = (data) => {
        return Network('post', 'signin', data)
    }

    static sign_out = (data) => {
        return Network('post', 'signout', data)
    }

    static profile_get = (data) => {
        return Network('post', 'get-profile', data)
    }

    static change_password = (data) => {
        return Network('post', 'change-password', data)
    }

    static profile_update = (data) => {
        return Network('post', 'update-profile', data)
    }

    static profile_updateimage = (data) => {
        return Network('post', 'upload-profile-image', data)
    }

    static get_hotelroom = (data) => {
        return Network('post', 'get-hotel-rooms', data)
    }

    static housekeeping_list = (data) => {
        return Network('post', 'get-hotel-housekeeping', data)
    }

    static resturant_list = (data) => {
        return Network('post', 'get-hotel-restaurant-items', data)
    }

    static update_cart = (data) => {
        return Network('post', 'save-cart-items', data)
    }

    static get_cart = (data) => {
        return Network('post', 'get-cart-items', data)
    }

    static place_order = (data) => {
        return Network('post', 'order-room-service', data)
    }

    static order_list = (data) => {
        return Network('post', 'order-list', data)
    }

    static booking_check = (data) => {
        return Network('post', 'user-booking-check', data)
    }
}
