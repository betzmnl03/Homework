class User < ApplicationRecord
    validates :name, presence: true 
    validates :email, format: { with: /(\A([a-z]*\s*)*\<*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\>*\Z)/i }, uniqueness: { case_sensitive: false },  presence: true 
    
    has_many :posts, dependent: :nullify
    has_many :comments, dependent: :nullify
    has_secure_password
end
