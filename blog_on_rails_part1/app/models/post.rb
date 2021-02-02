class Post < ApplicationRecord
    #validations for title
    # The title column must be present and unique.
    validates :title, presence: true, uniqueness:{ case_sensitive: false}

    #validations for body
    # The body column must be present and contain at least 50 characters.
    validates :body, presence: true, length:{minimum:50}

    #Association with comments => 1post, many comments
    has_many :comments, dependent: :destroy
end
