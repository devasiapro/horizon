"""create language table

Revision ID: 2ebbb87a8436
Revises: 9a05060dc5a2
Create Date: 2023-10-31 17:04:03.018910

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2ebbb87a8436'
down_revision: Union[str, None] = '9a05060dc5a2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table(
        'language',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(128), nullable=False)
    )


def downgrade() -> None:
    op.drop_table('language')
